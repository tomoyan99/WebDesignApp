import React from "react";
import {Box,Grid, GridItem,Text} from "@chakra-ui/react"
// import {MyDrawer} from "./components/MyDrawer";
import SideBar from "./components/SideBar";
import Typography from "@mui/material/Typography";
// import SideBar from "./components/SideBar2";

function App(): React.ReactElement {
  return (
      <SideBar>
        <Grid
            h="100%"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={3}
        >
          <GridItem rowSpan={1} colSpan={4} bg={"brown"}>
            <Text>タスク</Text>
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} bg={"brown"}>
            <Text>履歴</Text>
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} bg={"brown"}>
            <Text>トピック・ニュース</Text>
          </GridItem>
        </Grid>
      </SideBar>
  );
}

export default App
