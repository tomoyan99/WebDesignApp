import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BestBoutArea from "./Areas/BestBoutArea";
import {Box, HTMLChakraProps, IconButton, Text} from "@chakra-ui/react";
import {CommandList} from "./SideBar/CommandList";
import {MainViewer} from "./SideBar/MainViewer";
import {CommandBar} from "./SideBar/CommandBar";

const drawerWidth = 280;

function DrawerHeader({ children,...other }:HTMLChakraProps<"div">) {
    return (
        <Box
            display="flex"
            alignItems="center"
            px={1} // 左右のパディング
            py={3} // 上下のパディング
            justifyContent="space-between"
            {...other}
        >
            {children}
        </Box>
    );
}

export function SideBar({children}:{children:React.ReactNode}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [isCommandBarVisible, setIsCommandBarVisible] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        // Drawerのopen/closeとAppBarの表示をずらす
        if (open) {
            setIsCommandBarVisible(false);
            return ()=>{};
        } else {
            const timer = setTimeout(() => {
                setIsCommandBarVisible(true);
            },200);
            return () => clearTimeout(timer); // クリーンアップ
        }
    },[open]);

    return (
        <Box display={"flex"}>
            <CssBaseline />
            <CommandBar
                open={open}
                drawerWidth={drawerWidth}
                handleDrawerOpen={handleDrawerOpen}
                isVisible={isCommandBarVisible}
            />
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
                    <Text textStyle={"xl"} fontWeight={"bold"} w={"100%"} pl={"1em"}>
                        タスク DE トドりん！
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
                <CommandList/>
                <Divider />

                {/*ベストバウトエリア*/}
                <Box width={"100%"} height={"100%"} padding={2.5} display={"flex"} alignItems={"flex-end"}>
                    <BestBoutArea data={["1月8日","2月20日","3月10日"]}/>
                </Box>
            </Drawer>
            <MainViewer
                open={open}
                drawerWidth={drawerWidth}
            >
                <Box h={"100%"} width={"100%"}>
                    {children}
                </Box>
            </MainViewer>
        </Box>
    );
}



export default SideBar;