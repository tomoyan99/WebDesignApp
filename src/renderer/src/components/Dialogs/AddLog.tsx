import MyDialog from "../MyDialog";
import {Text} from "@chakra-ui/react";

interface Props {
    closeDialog: () => void;
    isOpen: boolean;
}

export function AddLog(props:Props) {
    return(
        <MyDialog.Root
            open={props.isOpen}
            closeOnInteractOutside={false}
            onOpenChange={props.closeDialog}
        >
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