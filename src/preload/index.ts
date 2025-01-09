// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  fetchUsers: async () => {
    return await ipcRenderer.invoke('get-users'); // メインプロセスのget-usersを呼び出し
  },
  addUser: async (user: { name: string; age: number }) => {
    return await ipcRenderer.invoke('add-user', user); // メインプロセスのadd-userを呼び出し
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
