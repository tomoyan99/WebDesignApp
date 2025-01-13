// src/main/db.ts データベースを初期化するファイル
import path from 'path';
import { app } from 'electron';
import knex from 'knex';

// データベースのインスタンスを作成
export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(app.getPath('userData'), 'database.sqlite'),
  },
  useNullAsDefault: true,
});

// テーブル作成関数
export async function setupDatabase() {
  // 既存 users テーブル
  const existsUsers = await db.schema.hasTable('users');
  if (!existsUsers) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('age');
    });
  }

  // --- ここから新規追加: tweets テーブル ---
  const existsTweets = await db.schema.hasTable('tweets');
  if (!existsTweets) {
    await db.schema.createTable('tweets', (table) => {
      table.increments('id').primary();
      table.string('message', 2000).notNullable(); // つぶやき本文
      table.bigint('posted_time').notNullable();   // 投稿時間(UNIXタイムミリ秒)
      table.boolean('summarized').defaultTo(false); // 「総括済み」かどうか
    });
  }

  // --- ここから新規追加: sessions テーブル ---
  // ストップウォッチの開始/終了を記録する
  const existsSessions = await db.schema.hasTable('sessions');
  if (!existsSessions) {
    await db.schema.createTable('sessions', (table) => {
      table.increments('id').primary();
      table.string('task_name').notNullable();       // タスク名
      table.bigint('start_time').notNullable();      // 開始時間(UNIXミリ秒)
      table.bigint('stop_time').nullable();          // 終了時間(UNIXミリ秒) 未終了の場合null
      table.string('note', 2000).nullable();         // 終了時の進捗メッセージ
      table.boolean('summarized').defaultTo(false);  // 「総括済み」かどうか
    });
  }
}
