import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './ui/provider';
import '@fontsource/zen-maru-gothic';
import { createTheme, ThemeProvider } from '@mui/material';
import { createSystem, defaultConfig } from '@chakra-ui/react';
import { StopwatchProvider } from './context/StopwatchContext';
import { DialogsProvider } from './context/DialogsContext';
import { TaskProvider } from './context/TaskContext';
import { SessionProvider } from './context/SessionContext';
import { LogProvider } from './context/LogContext';

// MUI テーマ設定
const theme = createTheme({
  typography: {
    fontFamily: "'Zen Maru Gothic', system-ui",
  },
});

// Chakra UI システム設定
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Zen Maru Gothic', system-ui" },
        body: { value: "'Zen Maru Gothic', system-ui" },
      },
    },
  },
});

/**
 * 各種 Provider をまとめてラップするコンポーネント
 * - LogProvider を最上位に配置し、App内で useLogContext を呼べるようにする
 */
function MyProviders({ children }: { children: React.ReactNode }) {
  return (
    <LogProvider>
      <TaskProvider>
        <StopwatchProvider>
          <SessionProvider>
            <DialogsProvider>
              {children}
            </DialogsProvider>
          </SessionProvider>
        </StopwatchProvider>
      </TaskProvider>
    </LogProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider system={system}>
        <MyProviders>
          <App />
        </MyProviders>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
