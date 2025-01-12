import MyDialog from "../MyDialog";
import {Heading, HStack,Text, VStack} from "@chakra-ui/react";
import { Button } from "../../ui/button";
import { useStopwatchContext } from "../../context/StopwatchContext";
import {formatStopWatchTime} from "../../util/formatStopWatchTime";
import {OpenChangeDetails} from "@zag-js/dialog";
import {DialogActionTrigger} from "../../ui/dialog";

interface Props {
    task?:string;
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
                <MyDialog.Content>
                    <MyDialog.Header>ストップウォッチ</MyDialog.Header>
                    <MyDialog.Body>
                        <VStack gap={4}>
                            <Heading size={"4xl"} textAlign={"center"} letterSpacing={4}>
                                {formatStopWatchTime(currentTime)}
                            </Heading>


                            {props.task && <Text>タスク: {props.task}</Text>}
                        </VStack>
                    </MyDialog.Body>
                    <MyDialog.Footer>
                        <HStack justifyContent={"center"} gap={4}>
                            {isRunning ? (
                                <DialogActionTrigger asChild>
                                    <Button onClick={finishStopwatch} variant="outline" colorPalette="red">
                                        終了
                                    </Button>
                                </DialogActionTrigger>
                            ) : (
                                <Button onClick={()=>{
                                    startStopwatch(props.task)
                                }} variant="solid" colorPalette="green">
                                    開始
                                </Button>
                            )}
                        </HStack>
                    </MyDialog.Footer>
                </MyDialog.Content>
            </MyDialog.Root>
        </>
    );
}

function TaskSelect(){

}