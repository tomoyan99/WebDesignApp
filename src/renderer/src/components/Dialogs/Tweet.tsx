import MyDialog from "../MyDialog";
import {Text, Textarea} from "@chakra-ui/react";
import * as React from "react";
import {Button} from "../../ui/button";
import {DialogActionTrigger} from "../../ui/dialog";
import convUnixToIso from "../../util/convUnixToIso";
import {PostInfo} from "../Areas/SessionArea";

interface Props {
    closeDialog: () => void;
    isOpen: boolean;
}

export function Tweet(props:Props) {
    const [value, setValue] = React.useState("");

    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }
    const onClickButton = async () => {
        if(!value) return;
        try {
          await window.api.postTweet(value); // DBにINSERT
        } catch(e){
          console.error(e);
        }
        setValue("");
        props.closeDialog();
    }
    const ref = React.useRef<HTMLTextAreaElement>(null);

    return(
        <MyDialog.Root
            open={props.isOpen}
            closeOnInteractOutside={false}
            initialFocusEl={() => ref.current}
            size={"lg"}
            onOpenChange={props.closeDialog}
        >
            <MyDialog.Content colorPalette={"orange"} bg={"orange.100"}>
                <MyDialog.Header>
                    <Text textStyle={"2xl"}>
                        つぶやき
                    </Text>
                </MyDialog.Header>
                <MyDialog.Body pb={3}>
                    <Textarea
                        name="tweet"
                        onChange={onChangeTextArea}
                        textStyle={"2xl"}
                        color={"black"}
                        bg={"white"}
                        minHeight={250}
                        resize={"none"}
                        fontWeight={"500"}
                        letterSpacing={0.1}
                        placeholder={"いまどうしてる？"}
                        ref={ref}
                        value={value}
                    />
                </MyDialog.Body>
                <MyDialog.Footer>
                    <DialogActionTrigger asChild>
                        <Button
                            bg={"orange.solid"}
                            color={"orange.contrast"}
                            type="submit"
                            alignSelf="flex-start"
                            size={"lg"}
                            onClick={onClickButton}
                            disabled={!value}
                            fontWeight={"bold"}
                        >
                            Submit
                        </Button>
                    </DialogActionTrigger>
                </MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}
