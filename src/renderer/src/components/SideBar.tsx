import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BestBoutArea from "./Areas/BestBoutArea";
import {For, HTMLChakraProps, Text, Box, IconButton, VStack, IconButtonProps} from "@chakra-ui/react";

import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddTaskIcon from '@mui/icons-material/AddTask';
// import { useWindowSize } from '../hooks/useWindowSize';
import {Tweet} from "./Dialogs/Tweet";
import {StopWatch} from "./Dialogs/StopWatch";
import {AddLog} from "./Dialogs/AddLog";
import {AddTask} from "./Dialogs/AddTask";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 280;

interface MainProps extends HTMLChakraProps<"div">{
    open?: boolean;
    drawerWidth: number;
}

const Main: React.FC<MainProps> = ({ open = false, drawerWidth, children,...other }) => {
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
};

interface AppBarProps extends HTMLChakraProps<"div">{
    open?: boolean;
    drawerWidth: number;
}

const AppBar: React.FC<AppBarProps&{isVisible:boolean}> = ({ open = false, drawerWidth, children,isVisible=false }) => {
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
};


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

export default function SideBarFrame({children}:{children:React.ReactNode}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [isAppBarVisible, setIsAppBarVisible] = React.useState(false);
    // const {windowHeight} = useWindowSize();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        // Drawerのopen/closeとAppBarの表示をずらす
        if (open) {
            setIsAppBarVisible(false);
            return ()=>{};
        } else {
            const timer = setTimeout(() => {
                setIsAppBarVisible(true);
            },200);
            return () => clearTimeout(timer); // クリーンアップ
        }
    },[open]);
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
        <Box display={"flex"}>
            <CssBaseline />
            <AppBar open={open} isVisible={isAppBarVisible} drawerWidth={drawerWidth}>
                <VStack>
                    <IconButton
                        {...sideBarIconButtonStyle}
                        onClick={handleDrawerOpen}
                        display={open?'none':"block"}
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
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "transparent",
                        color:"#220a04"
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Text textStyle={"2xl"} w={"100%"} pl={"1em"}>
                        アプリ名？
                    </Text>
                    <IconButton
                        size={"lg"}
                        bg={{
                            base: "transparent",
                            _hover:"blackAlpha.200"
                        }}
                        onClick={handleDrawerClose}
                        variant={"subtle"}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/*コマンドエリア*/}
                <List>
                    <For
                        each={[
                            { name: "ストップウォッチ", icon:<TimerOutlinedIcon/>,dialog:"stopwatch"},
                            { name: "記録", icon:<EditNoteIcon/>,dialog:"log"},
                            { name: "つぶやき", icon:<ChatBubbleIcon/>,dialog:"tweet"},
                            { name: "タスクを追加", icon:<AddTaskIcon/>,dialog:"task"},
                        ]}
                    >
                        {(item) =>{
                            switch (item.dialog) {
                                case "stopwatch":
                                    return (
                                        <StopWatch key={"StopWatch_List"}>
                                            <ListButton name={item.name} icon={item.icon}/>
                                        </StopWatch>
                                    );
                                case "log":
                                    return (
                                        <AddLog key={"AddLog_List"}>
                                            <ListButton name={item.name} icon={item.icon}/>
                                        </AddLog>
                                    );
                                case "task":
                                    return (
                                        <AddTask key={"AddTask_List"}>
                                            <ListButton name={item.name} icon={item.icon}/>
                                        </AddTask>
                                    );
                                case "tweet":
                                    return (
                                        <Tweet key={"AddTweet_List"}>
                                            <ListButton name={item.name} icon={item.icon}/>
                                        </Tweet>
                                    );
                                default:
                                    return (<></>);
                            }
                        }}
                    </For>
                </List>
                <Divider />
                {/*ベストバウトエリア*/}
                <Box width={"100%"} height={"100%"} padding={2.5} display={"flex"} alignItems={"flex-end"}>
                    <BestBoutArea data={["1月8日","2月20日","3月10日"]}/>
                </Box>
            </Drawer>
            <Main
                open={open}
                drawerWidth={drawerWidth}
            >
                <Box h={"100%"} width={"100%"}>
                    {children}
                </Box>
            </Main>
        </Box>
    );
}

function ListButton(props:{name:string,icon:React.ReactElement}) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Text fontSize={"1.1em"}>{props.name}</Text>}
                />
            </ListItemButton>
        </ListItem>
    );
}