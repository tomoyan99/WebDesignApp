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
    } = useStopwatchContext();
    return (
        <>
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
                            <TaskSelect/>
                        </VStack>
                    </MyDialog.Body>
                    <MyDialog.Footer justifyContent={"center"} pb={10}>
                        {isRunning ? (
                            <DialogActionTrigger asChild>
                                <Button
                                    size={"xl"}
                                    onClick={finishStopwatch}
                                    variant="outline"
                                    colorPalette="red"
                                >
                                    フィニッシュ
                                </Button>
                            </DialogActionTrigger>
                        ) : (
                            <Button
                                size={"xl"}
                                onClick={startStopwatch}
                                variant="solid"
                                colorPalette="green"
                            >
                                スタート
                            </Button>
                        )}
                    </MyDialog.Footer>
                </MyDialog.Content>
            </MyDialog.Root>
        </>
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