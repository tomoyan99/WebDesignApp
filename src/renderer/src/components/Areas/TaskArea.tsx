import {Area,AreaHeader,AreaBody} from "../Area";
import {Button} from "../../ui/button";
import {Box, For, HStack, Text, VStack} from "@chakra-ui/react";
import {StopWatch} from "../Dialogs/StopWatch";
import {EmptyState} from "../../ui/empty-state";
import { TbMoodSadSquint } from "react-icons/tb";
import {useStopwatchContext} from "../../context/StopwatchContext";

export interface TaskProps{
    date_unix:number,
    content:string,
    disabled?:boolean,
}

export default function TaskArea({tasks}:{tasks:TaskProps[]}) {
    const {isRunning} = useStopwatchContext();

    return(
        <Area>
            <AreaHeader>タスク</AreaHeader>
            <AreaBody shadow={"none"} overflowX="auto">
                {tasks.length > 0
                    ? (
                        <HStack
                            gap={4}
                            p={2}
                            pl={5}
                            pr={5}
                            overflowY="hidden"
                        >
                            <For each={tasks}>
                                {(item,index)=>{
                                    return (
                                        <Box
                                            bg={"transparent"}
                                            rounded={"md"}
                                            flexShrink={0}
                                            transition={"0.3s"}
                                            key={`TaskArea_Task${index}`}
                                        >
                                            <StopWatch task={item.content}>
                                                <Task
                                                    date_unix={item.date_unix}
                                                    content={item.content}
                                                    disabled={isRunning}
                                                />
                                            </StopWatch>
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


function Task(data:TaskProps){
    const nowDate = new Date(data.date_unix);
    const month = `${nowDate.getMonth() + 1}`.padStart(2, "0");
    const date = `${nowDate.getDate()}`.padStart(2, "0");

    const today = `${month}月${date}日`;

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
                disabled={data.disabled}
            >
                <VStack gap={1} w={"80px"}>
                    <Text>{today}</Text>
                    <Text
                        w={"100%"}
                        whiteSpace={"nowrap"}
                        overflowX={"hidden"}
                        textOverflow={"ellipsis"}
                    >{data.content}</Text>
                </VStack>
            </Button>
        </>
    );
}