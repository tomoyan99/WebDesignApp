import {Area, AreaBody, AreaHeader} from "../Area";
import {Button} from "../../ui/button";
import {Box, For, HStack, Text, VStack} from "@chakra-ui/react";
import {EmptyState} from "../../ui/empty-state";
import {TbMoodSadSquint} from "react-icons/tb";
import {useStopwatchContext} from "../../context/StopwatchContext";
import {useMyDialog} from "../../context/DialogsContext";
import {generateTaskHash,TaskItemNoHush, useTaskContext} from "../../context/TaskContext";
import {convUnixOnlyDate} from "../../util/convUnixOnlyDate";


export default function TaskArea() {
    const {isRunning} = useStopwatchContext();
    const {taskData} = useTaskContext();
    return(
        <Area>
            <AreaHeader>タスク</AreaHeader>
            <AreaBody shadow={"none"} overflowX="auto">
                {taskData.length > 0
                    ? (
                        <HStack
                            gap={4}
                            p={2}
                            pl={5}
                            pr={5}
                            overflowY="hidden"
                        >
                            <For each={taskData}>
                                {(item,index)=>{
                                    return (
                                        <Box
                                            bg={"transparent"}
                                            rounded={"md"}
                                            flexShrink={0}
                                            transition={"0.3s"}
                                            key={`TaskArea_Task${index}`}
                                        >
                                            <TaskButton
                                                date_unix={item.date_unix}
                                                task={item.task}
                                                disabled={isRunning}                                            />
                                        </Box>
                                    );
                                }}
                            </For>
                        </HStack>
                    )
                    : (<EmptyState
                        icon={<TbMoodSadSquint/>}
                        title={"タスクがないよ～"}
                        p={2}
                        color={"orange.900"}
                    />)}
            </AreaBody>
        </Area>
    );
}


function TaskButton(data:TaskItemNoHush&{disabled:boolean}){
    const { openDialog } = useMyDialog();
    const {taskNowHandler} = useTaskContext();
    const today = convUnixOnlyDate(data.date_unix);
    const {disabled,...dateAndTask} = data;
    return (
        <>
            <Button
                width={"100px"}
                height={"fit-content"}
                display={"grid"}
                alignItems={"center"}
                textAlign={"center"}
                p={1}
                rounded={"md"}
                bg={{
                    base:"orange.200/50",
                    _active:"orange.400"
                }}
                boxShadow={{
                    base:"0px 4px 0px slategray",
                    _hover:"none"
                }}
                translate={{
                    _hover:"0px 4px"
                }}
                borderWidth={2}
                borderColor={"orange.700"}
                color={"black"}
                fontWeight={"bold"}
                _active={{
                }}
                colorPalette={"orange"}
                disabled={disabled}
                onClick={() => {
                    taskNowHandler({
                        ...dateAndTask,
                        task_hush:generateTaskHash(dateAndTask)
                    });
                    openDialog("StopWatch")
                }}
            >
                <VStack gap={1} w={"80px"}>
                    <Text>{today}</Text>
                    <Text
                        w={"100%"}
                        whiteSpace={"nowrap"}
                        overflowX={"hidden"}
                        textOverflow={"ellipsis"}
                    >{dateAndTask.task}</Text>
                </VStack>
            </Button>
        </>
    );
}