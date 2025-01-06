import React from "react";
import {Box,Grid, GridItem} from "@chakra-ui/react"
// import {MyDrawer} from "./components/MyDrawer";
import SideBar from "./components/SideBar";
// import SideBar from "./components/SideBar2";

function App(): React.ReactElement {
  return (
      <Grid
          h="99vh"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={3}
      >
        <GridItem rowSpan={4} colSpan={1}>
          <Box bg={"gray"} h={"100%"}>
            <SideBar/>
            rowSpan=2
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <Box bg={"gray"} h={"100%"}>colSpan=4</Box>
        </GridItem>
        <GridItem rowSpan={3} colSpan={2}>
          <Box bg={"gray"} h={"100%"}>colSpan=2</Box>
        </GridItem>
        <GridItem rowSpan={3} colSpan={2}>
          <Box bg={"gray"} h={"100%"}>colSpan=2</Box>
        </GridItem>
      </Grid>
  );
}

export default App
