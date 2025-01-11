import MyDialog from "../MyDialog";
import { Box, Button } from "@chakra-ui/react";
import * as React from "react";
import { useStopwatchContext } from "../../context/StopwatchContext";

export function StopWatch(props:{children?:React.ReactNode,task?:string}) {
    const { startStopwatch, stopStopwatch } = useStopwatchContext();
    const [comment, setComment] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);

  // ダイアログを開始するトリガーにするためのステート
  // -> MyDialog.Root の open/close を外部で制御するなら props でもOK

    return(
        <MyDialog.Root 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        closeOnInteractOutside={false}>
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
         <Button
           colorScheme="orange"
           onClick={() => {
             startStopwatch();
             // ここでダイアログを閉じる
             setDialogOpen(false);
           }}
         >
           開始
         </Button>
                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}