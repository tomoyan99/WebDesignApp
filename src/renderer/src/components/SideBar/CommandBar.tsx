import {Box, HTMLChakraProps, IconButton, IconButtonProps, VStack} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import {StopWatch} from "../Dialogs/StopWatch";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {AddLog} from "../Dialogs/AddLog";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {AddTask} from "../Dialogs/AddTask";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {Tweet} from "../Dialogs/Tweet";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {useTheme} from "@mui/material/styles";

interface AppBarProps extends HTMLChakraProps<"div"> {
    open?: boolean;
    drawerWidth: number;
    isVisible:boolean;
}
interface CommandBarProps extends AppBarProps{
    isVisible:boolean;
    handleDrawerOpen:() => void;
}


function AppBar({ open = false, drawerWidth, children,isVisible=false }:AppBarProps){
    const theme = useTheme();

    // 動的にスタイルを決定
    const marginLeft = open ? `${drawerWidth}px` : "0";
    const transition = open
        ? `${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
        : `${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`;

    return (
        <Box
            as="header"
            bg="transparent"
            color="#000000"
            boxShadow="none"
            transition={transition}
            width={"55px"}
            minHeight="100vh"
            height="100vh"
            marginLeft={marginLeft}
            display={!open?"flex":"none"}
            justifyContent="flex-end"
        >
            { isVisible?children:<></>}
        </Box>
    );
}


export function CommandBar(props:CommandBarProps) {
    const sideBarIconButtonStyle :IconButtonProps ={
        size:"xl",
        textStyle:"xl",
        color:"orange.900",
        bg:{
            base: "transparent",
            _hover:"blackAlpha.200"
        }
    }

    return (
        <AppBar open={props.open} isVisible={props.isVisible} drawerWidth={props.drawerWidth}>
            <VStack>
                <IconButton
                    {...sideBarIconButtonStyle}
                    onClick={props.handleDrawerOpen}
                    display={props.open?'none':"block"}
                    variant={"subtle"}
                >
                    <MenuIcon />
                </IconButton>

                <Divider />

                {/*サイドバー*/}
                {/*ストップウォッチ*/}
                <StopWatch>
                    <IconButton {...sideBarIconButtonStyle}>
                        <TimerOutlinedIcon/>
                    </IconButton>
                </StopWatch>

                {/*記録*/}
                <AddLog>
                    <IconButton {...sideBarIconButtonStyle}>
                        <EditNoteIcon/>
                    </IconButton>
                </AddLog>

                {/*タスクの追加*/}
                <AddTask>
                    <IconButton {...sideBarIconButtonStyle}>
                        <ChatBubbleIcon/>
                    </IconButton>
                </AddTask>

                {/*つぶやき*/}
                <Tweet>
                    <IconButton {...sideBarIconButtonStyle}>
                        <AddTaskIcon/>
                    </IconButton>
                </Tweet>
            </VStack>
        </AppBar>
    )
}