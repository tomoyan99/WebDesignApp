import React, {useEffect} from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react"
import SideBar from "./components/MyDrawer";
import TaskArea from "./components/Areas/TaskArea";
import NewsArea from "./components/Areas/NewsArea";
import SessionArea from "./components/Areas/SessionArea";
import "./style/scroll.css";
import StopwatchDisplay from "./components/Dialogs/StopwatchDisplay";
import {formatStopWatchTime} from "./util/formatStopWatchTime";
import {useStopwatchContext} from "./context/StopwatchContext";
import {useTaskContext} from "./context/TaskContext";

/* --------------------------------------------------
   ここは大きなUI全体を構成しています。
   りれき(セッション履歴)のデータは 
   <SessionArea/> 側でDBから取得するように修正してあります。
-------------------------------------------------- */

function App(): React.ReactElement {
    const {
        isRunning,
        isMinimum,
        currentTime,
        finishStopwatch,
    } = useStopwatchContext();

    const { taskNow } = useTaskContext();

    // 特にApp自体では何も取得しない。SessionAreaなど各コンポーネントがデータを取得する。
    // UIレイアウトのみ行う

    return (
        <Box bg={"orange.50"} w={"100%"} h={"100vh"}
             colorPalette={"orange"}
        >
            {
                isRunning && isMinimum &&
                <StopwatchDisplay
                    time={formatStopWatchTime(currentTime)}
                    task={taskNow?.task}
                    onFinish={finishStopwatch}
                />
            }
            <SideBar>
                <Grid
                    h="100%"
                    templateRows="minmax(min-content, auto) minmax(10px, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    p={2}
                    pt={8}
                    gap={3}
                >
                    <GridItem colSpan={4}>
                        <TaskArea/>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <SessionArea/>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <NewsArea news={[]} />
                        {/* 
                          既存の NewsArea はダミーとして機能しています。
                          もし DB のツイートをここで流用するなら 
                          変更することも可能です。
                        */}
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
}

export default App
