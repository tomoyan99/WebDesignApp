import MyDialog from "../MyDialog";
import {Box, Textarea,Text} from "@chakra-ui/react";
import * as React from "react";
import { Button } from "../../ui/button";
import {DialogActionTrigger} from "../../ui/dialog";
import convUnixToIso from "../../util/convUnixToIso";
import {PostInfo} from "../Areas/SessionArea";

export function Tweet(props:{children?:React.ReactNode}) {
    const [value, setValue] = React.useState("");
    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }
    const onClickButton = () => {
        alert(value);
        setValue("");
        const message = value;
        const nowTimeUNIX = (new Date()).valueOf();
        const nowTimeISO = convUnixToIso(nowTimeUNIX);
        // 投稿
        const post:PostInfo = {
            date_iso :nowTimeISO,
            date_unix:nowTimeUNIX,
            postMessage:message,
        }
        console.log(post)
    }
    const ref = React.useRef<HTMLTextAreaElement>(null);
    return(
        <MyDialog.Root
            closeOnInteractOutside={false}
            initialFocusEl={() => ref.current}
            size={"lg"}
        >
            <MyDialog.Trigger>
                <Box>
                    {props.children}
                </Box>
            </MyDialog.Trigger>
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
                        letterSpacing={-2}
                        placeholder={"いまどうしてる？"}
                        ref={ref}
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