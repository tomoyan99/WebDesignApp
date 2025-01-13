import React from "react";
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
import {useSessionContext} from "./context/SessionContext";
import {newsData} from "./testData";

function App(): React.ReactElement {
    const {
        isRunning,
        isMinimum,
        currentTime,
        finishStopwatch,
    } = useStopwatchContext();

    const {taskNow} = useTaskContext();

    const {endSession} = useSessionContext();
    const handleStopwatchFinish = ()=>{
        endSession("たすくしゅーりょー！");
        finishStopwatch();
    };

    return (
        <Box bg={"orange.50"} w={"100%"} h={"100vh"}
             colorPalette={"orange"}
        >
            {
                isRunning && isMinimum &&
                <StopwatchDisplay
                    time={formatStopWatchTime(currentTime)}
                    task={taskNow?.task}
                    onFinish={handleStopwatchFinish}
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
                    <GridItem  colSpan={4}>
                        <TaskArea/>
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <SessionArea/>
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <NewsArea　news={newsData.slice(2,6)}/>
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
}

export default App
