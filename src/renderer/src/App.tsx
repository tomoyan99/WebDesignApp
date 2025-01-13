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
import {MySession, useSessionContext} from "./context/SessionContext";

const {dataHandler} = window;

function DataFetcher(){
    const {initializeSession} = useSessionContext();
    useEffect(() => {
        // const initialize = async () => {
        //     // const sessions = [await dataHandler.getSessions() as MySession];
        //     // console.log(sessions);
        //     initializeSession(sessions);
        // }
        // initialize();
    }, []);
}

function App(): React.ReactElement {
    const {
        isRunning,
        isMinimum,
        currentTime,
        finishStopwatch,
    } = useStopwatchContext();

    const {taskNow} = useTaskContext();
    DataFetcher();

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
                        <NewsArea　news={[]} />
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
}

export default App
