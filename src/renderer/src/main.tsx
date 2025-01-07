import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "./ui/provider"
import {} from "@chakra-ui/react"
import "@fontsource/dela-gothic-one"
import "@fontsource/m-plus-rounded-1c"
import {createTheme,ThemeProvider} from "@mui/material";

const theme = createTheme({
    typography:{
        fontFamily:"'M PLUS Rounded 1c',system-ui",
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider >
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
