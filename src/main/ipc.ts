// src/main/ipc.ts IPC通信を設定するファイル
import { ipcMain } from 'electron';
import { db } from './db';

// ユーザーデータを取得
ipcMain.handle('get-users', async () => {
  return await db('users').select('*');
});

// ユーザーを追加
ipcMain.handle('add-user', async (_event, user) => {
  return await db('users').insert(user);
});
