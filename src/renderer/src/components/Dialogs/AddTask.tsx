import MyDialog from "../MyDialog";
import {Box, Text} from "@chakra-ui/react";
import * as React from "react";

export function AddTask(props:{children?:React.ReactNode}) {
    return(
        <MyDialog.Root closeOnInteractOutside={false}>
            <MyDialog.Trigger>
                <Box>
                    {props.children}
                </Box>
            </MyDialog.Trigger>
            <MyDialog.Content>
                <MyDialog.Header>
                    たすくついか
                </MyDialog.Header>
                <MyDialog.Body>
                    <Text>
                        ここには
                        ダイアログの内容が
                        入るよ
                    </Text>
                </MyDialog.Body>
                <MyDialog.Footer>

                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}