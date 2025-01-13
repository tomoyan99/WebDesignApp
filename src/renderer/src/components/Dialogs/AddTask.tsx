// /src/renderer/src/components/Dialogs/AddTask.tsx
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
                    タスクついか
                </MyDialog.Header>
                <MyDialog.Body>
                </MyDialog.Body>
                <MyDialog.Footer>

                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}