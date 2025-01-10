import MyDialog from "../MyDialog";
import {Box, Text} from "@chakra-ui/react";
import * as React from "react";

export function AddLog(props:{children?:React.ReactNode}) {
    return(
        <MyDialog.Root closeOnInteractOutside={false}>
            <MyDialog.Trigger>
                <Box>
                    {props.children}
                </Box>
            </MyDialog.Trigger>
            <MyDialog.Content>
                <MyDialog.Header>
                    記録
                </MyDialog.Header>
                <MyDialog.Body>
                    <Text>
                        ここには
                        <br/>
                        ダイアログの内容が
                        <br/>
                        入るよ
                    </Text>
                </MyDialog.Body>
                <MyDialog.Footer>

                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}