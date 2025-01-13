import React, {useEffect} from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react"
import SideBar from "./components/MyDrawer";
import TaskArea from "./components/Areas/TaskArea";
import NewsArea from "./components/Areas/NewsArea";
import SessionArea from "./components/Areas/SessionArea";
import "./style/scroll.css";
import {test_news, test_sessions, test_tasks} from "./testData";
import StopwatchDisplay from "./components/Dialogs/StopwatchDisplay";
import {formatStopWatchTime} from "./util/formatStopWatchTime";
import {useStopwatchContext} from "./context/StopwatchContext";
import {useTaskContext} from "./context/TaskContext";

function DataFetcher(){
    const {addTask,taskData} = useTaskContext();
    useEffect(() => {
        let ignore = false;
        if(!ignore) addTask(test_tasks);
        console.log(taskData);
        return () => {
            ignore = true;
        };
    }, []);
}


function App(): React.ReactElement {
    const {
        isRunning,
        isMinimum,
        currentTime,
        finishStopwatch,
    } = useStopwatchContext();

    const {addTask,taskNow} = useTaskContext();

    useEffect(() => {
        let ignore = false;
        if(!ignore) addTask(test_tasks);
        return () => {
            ignore = true;
        };
    }, []);

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
                    <GridItem  colSpan={4}>
                        <TaskArea/>
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <SessionArea sessions={test_sessions}/>
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <NewsArea　news={test_news} />
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
}

export default App
