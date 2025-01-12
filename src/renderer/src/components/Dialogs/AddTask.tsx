import MyDialog from "../MyDialog";
import {Text} from "@chakra-ui/react";

interface Props {
    closeDialog: () => void;
    isOpen: boolean;
}

export function AddTask(props:Props) {
    return(
        <MyDialog.Root
            open={props.isOpen}
            closeOnInteractOutside={false}
            onOpenChange={props.closeDialog}
        >
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