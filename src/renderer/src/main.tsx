import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "./ui/provider"
import '@fontsource/zen-maru-gothic';
import {createTheme,ThemeProvider} from "@mui/material";
import {createSystem, defaultConfig} from "@chakra-ui/react";
import { StopwatchProvider } from "./context/StopwatchContext";
import {DialogsProvider} from "./context/DialogsContext";
import {TaskProvider} from "./context/TaskContext";
import TaskCreate from "./test/tasktest";

const theme = createTheme({
    typography:{
        fontFamily:"'Zen Maru Gothic',system-ui",
    }
});
const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Zen Maru Gothic',system-ui" },
                body: { value: "'Zen Maru Gothic',system-ui" },
            },
        },
    },
})

// プロバイダー十把一絡げ
function MyProviders({children}: {children: React.ReactNode}) {
    return (
        <TaskProvider>
            <StopwatchProvider>
                <DialogsProvider>
                    {children}
                </DialogsProvider>
            </StopwatchProvider>
        </TaskProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider system={system}>
                <MyProviders>
                    {/*<TaskCreate/>*/}
                    <App/>
                </MyProviders>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
