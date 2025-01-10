import MyDialog from "../MyDialog";
import {Box} from "@chakra-ui/react";
import * as React from "react";

export function StopWatch(props:{children?:React.ReactNode,task?:string}) {
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

                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}