import React from "react";
import {Box, Grid, GridItem} from "@chakra-ui/react"
import SideBar from "./components/SideBar";
import TaskArea from "./components/TaskArea";
import NewsArea from "./components/NewsArea";
import LogArea from "./components/LogArea";
import "./style/scroll.css";


function App(): React.ReactElement {
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
                      <LogArea/>
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
