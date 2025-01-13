// src/main/ipc.ts IPC通信を設定するファイル
import { ipcMain } from 'electron';
import { db } from './db';
import {MySessions} from "../preload/type"

// sessionの追加
ipcMain.handle('add-session', async (_event, { type, date_unix, date_iso, message, task, elapsed }) => {
  const [insertedId] = await db('sessions').insert({
    type,
    date_unix: date_unix,
    date_iso: date_iso,
    message,
    task,
    elapsed
  });
  return insertedId;
});

// postの追加
ipcMain.handle('add-post', async (_event, { sessionId, dateUnix, dateIso, message }) => {
  const [insertedId] = await db('posts').insert({
    session_id: sessionId,
    date_unix: dateUnix,
    date_iso: dateIso,
    message
  });
  return insertedId;
});

// replyの追加
ipcMain.handle('add-reply', async (_event, { postId, dateUnix, dateIso, message }) => {
  const [insertedId] = await db('replies').insert({
    post_id: postId,
    date_unix: dateUnix,
    date_iso: dateIso,
    message
  });
  return insertedId;
});

// sessionsの取得
ipcMain.handle('get-sessions', async () => {
  return db('sessions').select('*') as unknown as MySessions;
});

// postsの取得
ipcMain.handle('get-posts', async () => {
  return db('posts').select('*');
});

// repliesの取得
ipcMain.handle('get-replies', async () => {
  return db('replies').select('*');
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
