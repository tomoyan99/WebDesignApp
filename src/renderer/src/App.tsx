import React from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react"
import SideBar from "./components/MyDrawer";
import TaskArea from "./components/Areas/TaskArea";
import NewsArea from "./components/Areas/NewsArea";
import SessionArea from "./components/Areas/SessionArea";
import "./style/scroll.css";
import {useWindowSize} from "./hooks/useWindowSize";
import {test_news, test_sessions, test_tasks} from "./testData";


function App(): React.ReactElement {
    const {windowWidth,windowHeight} = useWindowSize();
    console.log(windowWidth,windowHeight);
    return (
        <Box bg={"orange.50"} w={"100%"} h={"100vh"}
            colorPalette={"orange"}
        >
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
                        <TaskArea tasks={test_tasks}/>
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
