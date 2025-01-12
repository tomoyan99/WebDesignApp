// import * as React  from 'react';
import {Box, Text, IconButton, HStack} from '@chakra-ui/react';
import { FaStop } from "react-icons/fa6";
import Draggable from 'react-draggable';
import React from "react";

interface DisplayProps {
    time:string;
    task?:string;
    onFinish:()=>void;
}

export default function StopwatchDisplay(props:DisplayProps) {
    const nodeRef = React.useRef(null);
    // const [isCommentOpen, setIsCommentOpen] = React.useState(false);
    // const [comment, setComment] = React.useState("");

    // isRunning === trueのときだけ表示
    return (
        <Draggable nodeRef={nodeRef}>
            <Box
                position="fixed"
                top="10px"
                left="10px"
                bg="orange.100"
                minW={"150px"}
                w={"fit-content"}
                borderRadius="md"
                boxShadow="md"
                zIndex={9999} // 常に前面に表示するため
                alignItems="center"
                textStyle={"xl"}
                px={2}
                py={1}
                ref={nodeRef}
            >
                <HStack
                    gap={2}
                    justifyContent="space-between"
                >
                    <Box w={"100%"} justifyContent={"center"} textAlign={"center"}>
                        <Text fontWeight="bold" letterSpacing={2}>
                            {props.task && `[${props.task}]`}
                            {props.task && <br/>}
                            {props.time}
                        </Text>
                    </Box>
                    <IconButton
                        onClick={props.onFinish}
                        size="md"
                        textStyle={"2xl"}
                        color={"red.500"}
                        bg={{
                            base:"transparent",
                            _hover:"blackAlpha.200"
                        }}
                    >
                        <FaStop />
                    </IconButton>
                </HStack>
            </Box>
        </Draggable>
    );
}
