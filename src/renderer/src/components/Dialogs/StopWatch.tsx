import MyDialog from "../MyDialog";
import { Box, Button } from "@chakra-ui/react";
import * as React from "react";
import { useStopwatchContext } from "../../context/StopwatchContext";
import { DialogActionTrigger } from "../../ui/dialog";

export function StopWatch(props:{children?:React.ReactNode,task?:string}) {
    const { startStopwatch, stopStopwatch } = useStopwatchContext();

    // ダイアログを開始するトリガーにするためのステート
    // -> MyDialog.Root の open/close を外部で制御するなら props でもOK

    return(
        <MyDialog.Root closeOnInteractOutside={false}>
            <MyDialog.Trigger>
                <Box>
                    {props.children}
                </Box>
            </MyDialog.Trigger>
            <MyDialog.Content>
                <MyDialog.Header>
                    ストップウォッチ
                </MyDialog.Header>
                <MyDialog.Body>
                    ここには
                    <br/>
                    ダイアログの内容が
                    <br/>
                    入るよ
                    <br/>
                    <br/>
                    {props.task && `タスク:${props.task}`}
                </MyDialog.Body>
                <MyDialog.Footer>
                    {/* 「開始」ボタン：ストップウォッチを開始してダイアログを閉じる */}
                    <DialogActionTrigger asChild>
                        <Button
                            colorScheme="orange"
                            onClick={startStopwatch}
                        >
                            開始
                        </Button>
                    </DialogActionTrigger>
                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}