import {Area,AreaHeader,AreaBody} from "./Area";
import {Button} from "../ui/button";
import {For, HStack, Text, VStack} from "@chakra-ui/react";

export default function TaskArea(){
    return(
        <Area>
            <AreaHeader>タスク</AreaHeader>
            <HStack
                w={"full"}
                h={"100%"}
                gap="4"
                paddingLeft="2"
                paddingRight="2"
                overflowX="auto"
            >
                <For each={[
                    <Task date={"10月22日"} content={"勉強"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                    <Task date={"12月22日"} content={"アバダケダブラと唱えてみる"}/>,
                ]}>
                    {(item)=>{
                        return (
                            <AreaBody
                                w={"fit-content"}
                                h={"fit-content"}
                                rounded={"md"}
                                flexShrink={0}
                                transition={"0.3s"}
                                _hover={{
                                    // bg: 'orange.300',
                                    scale:"1.1"
                                }}
                            >
                                {item}
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
        <Button
            height={"fit-content"}
            display={"grid"}
            alignItems={"center"}
            textAlign={"center"}
            padding={"3"}
            rounded={"inherit"}
            colorPalette={"orange"}
            bg={"transparent"}
            color={"orange.950"}
            fontWeight={"bold"}
            fontSize={"1.1em"}
            _active={{
                bg:"orange.400",
            }}
        >
            <VStack gap={"4"}>
                <Text>{data.date}</Text>
                <Text>{data.content}</Text>
            </VStack>
        </Button>
    );
}