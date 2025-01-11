import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "./ui/provider"
import '@fontsource/zen-maru-gothic';
import {createTheme,ThemeProvider} from "@mui/material";
import {createSystem, defaultConfig} from "@chakra-ui/react";
import { StopwatchProvider } from "./context/StopwatchContext";

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider system={system}>
            <StopwatchProvider>
                <App/>
            </StopwatchProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
