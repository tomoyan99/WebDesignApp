import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import * as path from "path"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve:{
      alias:[
        {find:"@renderer/",replacement:path.resolve("../src/renderer/")},
        {find:"@ui/",replacement:path.resolve("../src/renderer/src/ui/")},
      ],
    },
    plugins: [react()]
  }
})
