import {Area,AreaHeader,AreaBody} from "../Area";
import {Button} from "../../ui/button";
import {Box, For, HStack, Text, VStack} from "@chakra-ui/react";
import {StopWatch} from "../Dialogs/StopWatch";

export type TaskProps = {
    date:number,
    content:string
};


export default function TaskArea({tasks}:{tasks:TaskProps[]}) {
    return(
        <Area>
            <AreaHeader>タスク</AreaHeader>
            <AreaBody shadow={"none"}>
                <HStack
                    gap={4}
                    p={2}
                    pl={5}
                    pr={5}
                    overflowX="auto"
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
                                        <Task date={item.date} content={item.content}/>
                                    </StopWatch>
                                </Box>
                            );
                        }}
                    </For>
                </HStack>
            </AreaBody>
        </Area>
    );
}


function Task(data:TaskProps){
    const nowDate = new Date(data.date);
    const month = `${nowDate.getMonth() + 1}`.padStart(2, "0");
    const date = `${nowDate.getDate()}`.padStart(2, "0");

    const today = `${month}月${date}日`;

    return (
        <>
            <Button
                width={"90px"}
                height={"fit-content"}
                display={"grid"}
                alignItems={"center"}
                textAlign={"center"}
                // textStyle={"lg"}
                p={1}
                pl={3}
                pr={3}
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
            >
                <VStack gap={2}>
                    <Text>{today}</Text>
                    <Text
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                    >{data.content}</Text>
                </VStack>
            </Button>
        </>
    );
}