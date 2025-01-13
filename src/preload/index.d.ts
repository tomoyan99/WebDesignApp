import { ElectronAPI } from '@electron-toolkit/preload'

export interface API {
  fetchUsers: () => Promise<{ id: number; name: string; age: number }[]>;
  addUser: (user: { name: string; age: number }) => Promise<void>;

  // ★ 追加: IPC呼び出しメソッド
  postTweet: (message: string) => Promise<any>;
  getHistory: () => Promise<any[]>;
  startSession: (taskName: string) => Promise<number>;
  stopSession: (sessionId: number, note: string) => Promise<boolean>;
  getSummary: () => Promise<{
    tweets: any[];
    sessions: any[];
  }>;
  markSummarized: (tweetIds: number[], sessionIds: number[]) => Promise<boolean>;
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
