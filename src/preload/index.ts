// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import "./index"
import {API, MySessionItemEnd, MySessionItemPost, MySessionItemStart, MySessions} from "./type";


export const dataHandler:API = {
  // セッション関連
  addSession: async (session: MySessionItemStart | MySessionItemEnd) => {
    return await ipcRenderer.invoke('add-session', session);
  },
  getSessions: async (): Promise<MySessions> => {
    return await ipcRenderer.invoke('get-sessions');
  },
  startSession: async (taskName: string): Promise<number> => {
    return await ipcRenderer.invoke('start-session', { taskName });
  },
  stopSession: async (sessionId: number, note: string | null): Promise<boolean> => {
    return await ipcRenderer.invoke('stop-session', { sessionId, note });
  },

  // 投稿関連
  addPost: async (post: MySessionItemPost) => {
    return await ipcRenderer.invoke('add-post', post);
  },
  getPosts: async (): Promise<MySessionItemPost[]> => {
    return await ipcRenderer.invoke('get-posts');
  },

  // 返信関連
  addReply: async (reply: MySessionItemPost['reply']) => {
    if (!reply) throw new Error('Reply data is required');
    return await ipcRenderer.invoke('add-reply', reply);
  },
  getReplies: async (): Promise<MySessionItemPost['reply'][]> => {
    return await ipcRenderer.invoke('get-replies');
  },

  // 総括関連
  getSummary: async (): Promise<{
    tweets: MySessionItemPost[];
    sessions: MySessions;
  }> => {
    return await ipcRenderer.invoke('get-summary');
  },
  markSummarized: async (tweetIds: number[], sessionIds: number[]): Promise<boolean> => {
    return await ipcRenderer.invoke('mark-summarized', { tweetIds, sessionIds });
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('dataHandler', dataHandler);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.dataHandler = dataHandler;
}
