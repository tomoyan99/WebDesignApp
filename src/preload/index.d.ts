import { ElectronAPI } from '@electron-toolkit/preload'

export interface API {
  fetchUsers: () => Promise<{ id: number; name: string; age: number }[]>;
  addUser: (user: { name: string; age: number }) => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
