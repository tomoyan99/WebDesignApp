import React from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react"
import SideBar from "./components/SideBar";
import TaskArea from "./components/TaskArea";
import NewsArea from "./components/NewsArea";
import SessionArea from "./components/SessionArea";
import "./style/scroll.css";
import {useWindowSize} from "./hooks/useWindowSize";
import {test_sessions} from "./testData";


function App(): React.ReactElement {
    const {windowWidth,windowHeight} = useWindowSize();
    console.log(windowWidth,windowHeight);
    return (
        <Box bg={"orange.50"} w={"100%"} h={"100vh"}>
            <SideBar>
                <Grid
                    h="100%"
                    templateRows="repeat(4, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={3}
                >
                    <GridItem rowSpan={1} colSpan={4}>
                        <TaskArea/>
                    </GridItem>
                    <GridItem rowSpan={3} colSpan={2}>
                        <SessionArea sessions={test_sessions}/>
                    </GridItem>
                    <GridItem rowSpan={3} colSpan={2}>
                        <NewsArea/>
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
}

export default App
