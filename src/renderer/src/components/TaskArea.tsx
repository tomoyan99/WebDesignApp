import {Area,AreaHeader,AreaBody} from "./Area";
import {Button} from "../ui/button";
import {For, HStack, Text, VStack} from "@chakra-ui/react";
import {StopWatch} from "./Dialogs/StopWatch";

export default function TaskArea(){
    return(
        <Area>
            <AreaHeader>タスク</AreaHeader>
            <HStack
                gap="4"
                padding="4"
                overflowX="auto"
                overflowY="hidden"
            >
                <For each={[
                    {date:"10月22日",content:"食べる"}
                ]}>
                    {(item,index)=>{
                        return (
                            <AreaBody
                                w={"fit-content"}
                                h={"fit-content"}
                                rounded={"md"}
                                flexShrink={0}
                                transition={"0.3s"}
                                key={`TaskArea_Task${index}`}
                                _hover={{
                                    bg:"orange.50/80",
                                    scale:"1.1"
                                }}
                            >
                                <StopWatch task={item.content}>
                                    <Task date={item.date} content={item.content}/>
                                </StopWatch>
                            </AreaBody>
                        );
                    }}
                </For>
            </HStack>
        </Area>
    );
}



type TaskProps = {
  date:string,
  content:string
};

function Task(data:TaskProps){
    return (
        <>
            <Button
                height={"fit-content"}
                display={"grid"}
                alignItems={"center"}
                textAlign={"center"}
                p={"3"}
                pl={"5"}
                pr={"5"}
                rounded={"inherit"}
                colorPalette={"orange"}
                bg={"transparent"}
                color={"orange.950"}
                fontWeight={"bold"}
                fontSize={"xl"}
                _active={{
                    bg:"orange.400",
                }}
            >
                <VStack gap={"4"}>
                    <Text>{data.date}</Text>
                    <Text>{data.content}</Text>
                </VStack>
            </Button>
        </>
    );
}