import {db} from "./dbReact";

// テーブル作成関数
export async function setupDatabase() {
    // sessions テーブルの作成
    const existsSessions = await db.schema.hasTable('sessions');
    if (!existsSessions) {
        await db.schema.createTable('sessions', (table) => {
            table.increments('id').primary();
            table.string('type');
            table.integer('date_unix');
            table.string('date_iso');
            table.string('message');
            table.string('task').nullable();
            table.integer('elapsed').nullable();
        });
    }

    // posts テーブルの作成
    const existsPosts = await db.schema.hasTable('posts');
    if (!existsPosts) {
        await db.schema.createTable('posts', (table) => {
            table.increments('id').primary();
            table.string('type');
            table.integer('session_id').unsigned().references('id').inTable('sessions');
            table.integer('date_unix');
            table.string('date_iso');
            table.string('message');
        });
    }

    // replies テーブルの作成
    const existsReplies = await db.schema.hasTable('replies');
    if (!existsReplies) {
        await db.schema.createTable('replies', (table) => {
            table.increments('id').primary();
            table.integer('post_id').unsigned().references('id').inTable('posts');
            table.string('message');
            table.integer('date_unix');
            table.string('date_iso');
        });
    }
}