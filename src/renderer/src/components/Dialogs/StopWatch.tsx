import MyDialog from "../MyDialog";
import {createListCollection, Heading,VStack} from "@chakra-ui/react";
import { Button } from "../../ui/button";
import { useStopwatchContext } from "../../context/StopwatchContext";
import {formatStopWatchTime} from "../../util/formatStopWatchTime";
import {OpenChangeDetails} from "@zag-js/dialog";
import {DialogActionTrigger} from "../../ui/dialog";
import {SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../../ui/select";
import {useTaskContext} from "../../context/TaskContext";
import {convUnixOnlyDate} from "../../util/convUnixOnlyDate";
import React from "react";

/*
  ストップウォッチのモーダル。
  - startStopwatch() 時に "start-session" IPC を呼びDB登録
  - finishStopwatch() 時に "stop-session" IPC を呼びDB更新 (進捗)
  ただし StopWatchContext の仕組みを崩さないため、Context が管理する
  sessionId, note などをフック or State で保持
*/

interface Props {
    closeDialog: () => void;
    isOpen: boolean;
}

export function StopWatch(props: Props) {
    // ストップウォッチの状態を管理
    const {
        currentTime,
        isRunning,
        startStopwatch,
        finishStopwatch,
        setIsMinimum,
        sessionId,
        setSessionId,
        note,
        setNote,
    } = useExtendedStopwatch();

    const handleStart = async () => {
      // DBへInsert
      const newSessionId = await window.api.startSession(taskLabel());
      // Context内に sessionId 保持
      setSessionId(newSessionId);
      startStopwatch();
    };

    const handleFinish = async () => {
      // DB更新 (progress note)
      if(sessionId){
        await window.api.stopSession(sessionId, note || "");
      }
      finishStopwatch();
    };

    return (
      <MyDialog.Root
          open={props.isOpen}
          closeOnInteractOutside={false}
          onOpenChange={(details: OpenChangeDetails)=>{
              setIsMinimum(!details.open);
              props.closeDialog();
          }}
      >
          <MyDialog.Content h={"450px"} bg={"orange.50"}>
              <MyDialog.Header>ストップウォッチ</MyDialog.Header>
              <MyDialog.Body pb={2} >
                  <VStack justify="space-between" gap={4}>
                      <Heading
                          size={"6xl"}
                          textAlign={"center"}
                          letterSpacing={4}
                          py={7}
                      >
                          {formatStopWatchTime(currentTime)}
                      </Heading>
                      <TaskSelect />
                      <textarea
                        style={{
                          width: "80%",
                          minHeight: "50px",
                          marginTop: "10px",
                          borderColor: "#ccc",
                          borderRadius: "4px",
                          padding: "8px"
                        }}
                        placeholder="進捗メモ (停止時に保存されます)"
                        value={note}
                        onChange={(e)=> setNote(e.target.value)}
                        disabled={!isRunning}
                      />
                  </VStack>
              </MyDialog.Body>
              <MyDialog.Footer justifyContent={"center"} pb={10}>
                  {isRunning ? (
                      <DialogActionTrigger asChild>
                          <Button
                              size={"xl"}
                              onClick={handleFinish}
                              variant="outline"
                              colorPalette="red"
                          >
                              フィニッシュ
                          </Button>
                      </DialogActionTrigger>
                  ) : (
                      <Button
                          size={"xl"}
                          onClick={handleStart}
                          variant="solid"
                          colorPalette="green"
                      >
                          スタート
                      </Button>
                  )}
              </MyDialog.Footer>
          </MyDialog.Content>
      </MyDialog.Root>
    );
}

function TaskSelect(){
    const {taskNow,taskData,taskNowHandler} = useTaskContext();
    const {isRunning} = useStopwatchContext();
    const frameworks = createListCollection({
        items: taskData.map((task) =>{
            const today = convUnixOnlyDate(task.date_unix);
            return {label:`[${today}] ${task.task}`,value:task.task_hush};
        }),
    });
    return(
        <SelectRoot
            collection={frameworks}
            size="lg"
            width="80%"
            colorPalette={"orange"}
            disabled={isRunning}
            defaultValue={[taskNow?.task_hush]}
            onValueChange={(details)=>{
                const taskTarget = taskData.filter((task)=>task.task_hush === details.value)[0];
                taskNowHandler(taskTarget);
            }}
        >
            <SelectLabel textStyle={"lg"}>タスク</SelectLabel>
            <SelectTrigger
                bg={"orange.100/60"}
                borderWidth={1}
                borderColor={{
                    base:"orange.100",
                    _focusWithin:"orange.500",
                }}
            >
                <SelectValueText placeholder="タスクを選択" />
            </SelectTrigger>
            <SelectContent zIndex={9999} bg={"orange.100"}>
                {frameworks.items.map((data) => (
                        <SelectItem
                            item={data}
                            key={data.value}
                            bg={{
                                _hover:"orange.200",
                                _selected:"orange.300"
                            }}
                        >
                            {data.label}
                        </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    )
}


/* ------------------------------------------------
   拡張ストップウォッチフック:
   - sessionId, note を管理
------------------------------------------------ */
function useExtendedStopwatch(){
  const sw = useStopwatchContext();
  const [sessionId, setSessionId] = React.useState<number|null>(null);
  const [note, setNote] = React.useState("");

  // stopwatchをリセットした際に sessionId, note もリセット
  const finishStopwatch = React.useCallback(() => {
    sw.finishStopwatch();
    setSessionId(null);
    setNote("");
  }, [sw]);

  const resetStopwatch = React.useCallback(() => {
    sw.resetStopwatch();
    setSessionId(null);
    setNote("");
  }, [sw]);

  const taskLabel = React.useCallback(()=>{
    return sw.taskNow?.task || "無題タスク";
  }, [sw.taskNow]);

  return {
    ...sw,
    sessionId, setSessionId,
    note, setNote,
    finishStopwatch,
    resetStopwatch,
    taskLabel
  };
}
