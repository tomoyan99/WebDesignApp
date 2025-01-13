// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  fetchUsers: async () => {
    return await ipcRenderer.invoke('get-users');
  },
  addUser: async (user: { name: string; age: number }) => {
    return await ipcRenderer.invoke('add-user', user);
  },

  // ★ 追加IPC呼び出し
  postTweet: async (message: string) => {
    return await ipcRenderer.invoke('post-tweet', { message });
  },
  getHistory: async () => {
    return await ipcRenderer.invoke('get-history');
  },
  startSession: async (taskName: string) => {
    return await ipcRenderer.invoke('start-session', { taskName });
  },
  stopSession: async (sessionId: number, note: string) => {
    return await ipcRenderer.invoke('stop-session', { sessionId, note });
  },
  getSummary: async () => {
    return await ipcRenderer.invoke('get-summary');
  },
  markSummarized: async (tweetIds: number[], sessionIds: number[]) => {
    return await ipcRenderer.invoke('mark-summarized', { tweetIds, sessionIds });
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
