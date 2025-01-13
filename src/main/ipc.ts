// src/main/ipc.ts IPC通信を設定するファイル
import { ipcMain } from 'electron';
import { db } from './db';

// 既存: ユーザーデータを取得
ipcMain.handle('get-users', async () => {
  return await db('users').select('*');
});

// 既存: ユーザーを追加
ipcMain.handle('add-user', async (_event, user) => {
  return await db('users').insert(user);
});

/* --------------------------------------------------
  ここから追加のIPCハンドラ
-------------------------------------------------- */

// 1) つぶやきを投稿 (tweets テーブルに INSERT)
ipcMain.handle('post-tweet', async (_event, { message }) => {
  if (!message) return null;
  const now = Date.now();
  const [insertedId] = await db('tweets').insert({
    message,
    posted_time: now,
    summarized: false,
  });
  return insertedId;
});

// 2) りれきを取得
//    sessions テーブル (タスク開始/停止) と tweets テーブル (つぶやき)
//    を合体させて時系列順に返す。クライアントがタイムラインに描画する。
ipcMain.handle('get-history', async () => {
  // sessions → start と stop を2種類として展開
  // tweets → つぶやき
  // 各オブジェクトに "type" を付与して合体後に timestamp 昇順ソートで返す

  // まず sessions を取得
  const sessions = await db('sessions').select('*');
  // sessionsから2つのイベント(start,stop)を作る
  const sessionEvents = [];
  sessions.forEach((s) => {
    // start
    sessionEvents.push({
      type: 'session-start',
      id: s.id,
      task_name: s.task_name,
      time: s.start_time,
    });
    // stop があれば
    if (s.stop_time) {
      sessionEvents.push({
        type: 'session-stop',
        id: s.id,
        task_name: s.task_name,
        time: s.stop_time,
        note: s.note,
        start_time: s.start_time
      });
    }
  });

  // tweets を取得
  const tweets = await db('tweets').select('*');
  // tweets をtime-line向けのデータに
  const tweetEvents = tweets.map((t) => ({
    type: 'tweet',
    id: t.id,
    message: t.message,
    time: t.posted_time,
  }));

  // まとめて timestamp (time) でソート
  const combined = [...sessionEvents, ...tweetEvents].sort((a, b) => {
    return a.time - b.time;
  });

  return combined;
});

// 3) ストップウォッチ開始時: sessions テーブルにINSERT
ipcMain.handle('start-session', async (_event, { taskName }) => {
  // start_timeは現在時刻で
  const now = Date.now();
  const [insertedId] = await db('sessions').insert({
    task_name: taskName,
    start_time: now,
    stop_time: null,
    note: null,
    summarized: false,
  });
  return insertedId;
});

// 4) ストップウォッチ停止時: sessions テーブルの該当レコードを更新
ipcMain.handle('stop-session', async (_event, { sessionId, note }) => {
  const now = Date.now();
  await db('sessions')
    .where({ id: sessionId })
    .update({
      stop_time: now,
      note,
    });
  return true;
});

// 5) 一日を総括: 直近36時間 & summarized=false の tweets と sessions を取得 → まとめて返す
ipcMain.handle('get-summary', async () => {
  const now = Date.now();
  // 36時間前(ミリ秒)
  const limit = now - 36 * 60 * 60 * 1000;

  // summarized=false & posted_time >= limit
  const recentTweets = await db('tweets')
    .where('posted_time', '>=', limit)
    .andWhere('summarized', false)
    .select('*');

  // summarized=false & start_time or stop_time が36時間以内のもの
  //   sessionは、stop_timeがnullのままかもしれないので、start_timeかstop_timeいずれかが36h以内に該当すれば対象とする
  //   ざっくり: (start_time >= limit) or (stop_time >= limit)
  const recentSessions = await db('sessions')
    .where(function () {
      this.where('start_time', '>=', limit).orWhere('stop_time', '>=', limit);
    })
    .andWhere('summarized', false)
    .select('*');

  return {
    tweets: recentTweets,
    sessions: recentSessions,
  };
});

// 6) 一日を総括後に summarize する (フロントで「既読」処理したい場合用: 例)
ipcMain.handle('mark-summarized', async (_event, { tweetIds, sessionIds }) => {
  // tweetIds, sessionIds それぞれ updated
  await db('tweets').whereIn('id', tweetIds).update({ summarized: true });
  await db('sessions').whereIn('id', sessionIds).update({ summarized: true });
  return true;
});
