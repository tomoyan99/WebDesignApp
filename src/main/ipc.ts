// src/main/ipc.ts IPC通信を設定するファイル
import { ipcMain } from 'electron';
import { db } from './db';

// ランダムに3件のニュースを取得する関数
async function getRandomNews() {
  try {
    const randomNews:{title:string,content:string}[] = await db('news')
        .orderByRaw('RANDOM()') // ランダムに並べ替え
        .limit(3); // 3件に制限
    return randomNews;
  } catch (error) {
    return []
  }
}

ipcMain.handle("getRandomNews", async (_event, {}) => {
  return await getRandomNews();
})
