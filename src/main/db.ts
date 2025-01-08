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
  const exists = await db.schema.hasTable('users');
  if (!exists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('age');
    });
  }
}
