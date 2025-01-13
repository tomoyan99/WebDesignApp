import React, { useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./components/MyDrawer";
import TaskArea from "./components/Areas/TaskArea";
import NewsArea from "./components/Areas/NewsArea";
import SessionArea from "./components/Areas/SessionArea";
import "./style/scroll.css";
import { test_news, testSessions, testTasks } from "./testData";
import StopwatchDisplay from "./components/Dialogs/StopwatchDisplay";
<<<<<<< HEAD
import { formatStopWatchTime } from "./util/formatStopWatchTime";
import { useStopwatchContext } from "./context/StopwatchContext";
import { useTaskContext } from "./context/TaskContext";
import { useSessionContext } from "./context/SessionContext";

/**
 * 例: テストデータを一括投入するためのコンポーネント
 */
function DataFetcher() {
  const { addTask } = useTaskContext();
  const { initializeSession } = useSessionContext();
  useEffect(() => {
    // addTask(testTasks);
    // initializeSession(testSessions);
  }, []);
  return null; 
  // レンダリングする要素はないが、初回マウント時に副作用を発火させる
=======
import {formatStopWatchTime} from "./util/formatStopWatchTime";
import {useStopwatchContext} from "./context/StopwatchContext";
import {useTaskContext} from "./context/TaskContext";
import {useSessionContext} from "./context/SessionContext";
function DataFetcher(){
    const {initializeSession} = useSessionContext();
    useEffect(() => {
        // addTask(testTasks);
        // initializeSession(testSessions);
    }, []);
>>>>>>> e76705db2341f0dc1fed76ccd4bf36ba1ab51764
}

function App(): React.ReactElement {
  const {
    isRunning,
    isMinimum,
    currentTime,
    finishStopwatch,
  } = useStopwatchContext();

  const { taskNow } = useTaskContext();

<<<<<<< HEAD
  // テストデータを投入したい場合は DataFetcher 内の addTask, initializeSession 呼び出しを使う
  DataFetcher();

  return (
    <Box
      bg="orange.50"
      w="100%"
      h="100vh"
      colorPalette="orange"
    >
      {/* 最小化表示のストップウォッチ */}
      {isRunning && isMinimum && (
        <StopwatchDisplay
          time={formatStopWatchTime(currentTime)}
          task={taskNow?.task}
          onFinish={finishStopwatch}
        />
      )}

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
            <TaskArea />
          </GridItem>
          <GridItem colSpan={2}>
            <SessionArea />
          </GridItem>
          <GridItem colSpan={2}>
            {/* 
              NewsAreaに props で news={test_news} を渡すと型エラーが起きるので
              NewsArea側で props を受け取るか、LogContextを使う実装にするか。
              ここでは props を定義する実装例にしています。
            */}
            <NewsArea news={test_news} />
          </GridItem>
        </Grid>
      </SideBar>
    </Box>
  );
=======
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
                        <NewsArea　news={test_news} />
                    </GridItem>
                </Grid>
            </SideBar>
        </Box>
    );
>>>>>>> e76705db2341f0dc1fed76ccd4bf36ba1ab51764
}

export default App;
