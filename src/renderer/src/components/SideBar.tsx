import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BestBoutArea from "./BestBoutArea";
import {For, Text} from "@chakra-ui/react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useWindowSize } from '../hooks/useWindowSize';
import {Tweet} from "./Dialogs/Tweet";
import {StopWatch} from "./Dialogs/StopWatch";
import {AddLog} from "./Dialogs/AddLog";
import {AddTask} from "./Dialogs/AddTask";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' }) <{ open?: boolean; }>(({ theme }) => ({
    flexGrow: 1,
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    height: '100vh',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));



interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar,{shouldForwardProp: (prop) => prop !== 'open'})
    <AppBarProps>(({ theme }) => ({
        backgroundColor: "transparent",
        color:"#000000",
        boxShadow:"none",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: `${drawerWidth}px`,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

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
    const {windowHeight} = useWindowSize();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {mr: 2},
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/*コマンドエリア*/}
                <List>
                    <For
                        each={[
                            { name: "ストップウォッチ", icon:<AccessAlarmIcon/>,dialog:"stopwatch"},
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
            <Main open={open} sx={{display: 'grid',gridTemplateRows:"fit-content(100%) 1fr"}}>
                <Toolbar variant="dense" sx={{minHeight: '36px',height:"36px"}}/>
                <Box height={`${windowHeight-64}px`} width={"100%"}>
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