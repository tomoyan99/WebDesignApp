import MyDialog from "../MyDialog";
import {Heading} from "@chakra-ui/react";
import { Button } from "../../ui/button";
import { useStopwatchContext } from "../../context/StopwatchContext";
import {formatStopWatchTime} from "../../util/formatStopWatchTime";
import {OpenChangeDetails} from "@zag-js/dialog";
import {DialogActionTrigger} from "../../ui/dialog";

interface Props {
    task?:string;
    closeDialog: () => void;
    isOpen: boolean;
}

export function StopWatch(props: Props) {
    // ストップウォッチの状態を管理
    const {
        currentTime,
        isRunning,
        startStopwatch,
        finishStopwatch,
        setIsMinimum,
    } = useStopwatchContext();
    return (
        <>
            <MyDialog.Root
                open={props.isOpen}
                closeOnInteractOutside={false}
                onOpenChange={(details: OpenChangeDetails)=>{
                    setIsMinimum(!details.open);
                    props.closeDialog();
                }}
            >
                <MyDialog.Content>
                    <MyDialog.Header>ストップウォッチ</MyDialog.Header>
                    <MyDialog.Body>
                        <Heading size={"xl"} style={{ fontSize: "2rem", textAlign: "center" }}>
                            {formatStopWatchTime(currentTime)}
                        </Heading>
                        {props.task && <p style={{ marginTop: "1rem" }}>タスク: {props.task}</p>}
                    </MyDialog.Body>
                    <MyDialog.Footer>
                        <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem"}}>
                            {isRunning ? (
                                <DialogActionTrigger asChild>
                                    <Button onClick={finishStopwatch} variant="outline" colorPalette="red">
                                        終了
                                    </Button>
                                </DialogActionTrigger>
                            ) : (
                                <Button onClick={()=>{
                                    startStopwatch(props.task)
                                }} variant="solid" colorPalette="green">
                                    開始
                                </Button>
                            )}
                        </div>
                    </MyDialog.Footer>
                </MyDialog.Content>
            </MyDialog.Root>
        </>
    );
}