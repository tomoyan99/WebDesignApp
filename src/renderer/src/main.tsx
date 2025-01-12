import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "./ui/provider"
import '@fontsource/zen-maru-gothic';
import {createTheme,ThemeProvider} from "@mui/material";
import {createSystem, defaultConfig} from "@chakra-ui/react";
import { StopwatchProvider } from "./context/StopwatchContext";
import {DialogsProvider} from "./context/DialogsContext";
import {TaskProvider, useTaskContext} from "./context/TaskContext";
import {test_tasks} from "./testData";

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
        <StopwatchProvider>
            <DialogsProvider>
                <TaskProvider>
                    {children}
                </TaskProvider>
            </DialogsProvider>
        </StopwatchProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider system={system}>
                <MyProviders>
                    <App/>
                </MyProviders>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
