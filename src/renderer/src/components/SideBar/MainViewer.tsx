import {Box, HTMLChakraProps} from "@chakra-ui/react";
import {useTheme} from "@mui/material/styles";

interface MainViewerProps extends HTMLChakraProps<"div">{
    open?: boolean;
    drawerWidth: number;
}

export function MainViewer({ open = false, drawerWidth, children,...other }:MainViewerProps){
    const theme = useTheme();
    const marginLeft = open ? 0 : `-${drawerWidth}px`;

    const transition = open
        ? `${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
        : `${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`;

    return (
        <Box
            flexGrow={1}
            h="100vh"
            transition={`margin ${transition}`}
            ml={marginLeft}
            pl={open?2:0}
            overflowY={"hidden"}
            {...other}
        >
            {children}
        </Box>
    );
}
