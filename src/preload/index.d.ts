import { ElectronAPI } from '@electron-toolkit/preload'
import API from "./type"

declare global {
  interface Window {
    electron: ElectronAPI
    dataHandler: API
  }
}
