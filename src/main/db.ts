import path from 'path';
import { app } from 'electron';
import knex from 'knex';

export const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(app.getPath('userData'), 'WebDesignApp.sqlite'),
    },
    useNullAsDefault: true,
});

// テーブルが存在するか確認し、存在しなければ作成する
async function ensureTableExists() {
    const hasTable = await db.schema.hasTable('news');
    if (!hasTable) {
        try {
            await db.schema.createTable('news', (table) => {
                table.increments('id').primary(); // 自動インクリメントのID
                table.string('title').notNullable();
                table.text('content').notNullable();
            });
            console.log('ニューステーブルが作成されました。');
        } catch (error) {
            console.error('テーブル作成エラー:', error);
        }
    }
}
// ニュースデータをデータベースに挿入
async function insertNewsData() {
    try {
        for (const newsItem of newsData) {
            await db('news').insert(newsItem);
        }
        console.log('ニュースデータが挿入されました。');
    } catch (error) {
        console.error('データ挿入エラー:', error);
    }
}

// テーブル作成関数
export async function setupDatabase() {
    await ensureTableExists();
    await insertNewsData();
}