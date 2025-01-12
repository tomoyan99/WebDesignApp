import MyDialog from "../MyDialog";
import {Box, Portal} from "@chakra-ui/react";
import * as React from "react";
import { Button } from "../../ui/button";
import { useStopwatchContext } from "../../context/StopwatchContext";
import {formatStopWatchTime} from "../../util/formatStopWatchTime";
import {OpenChangeDetails} from "@zag-js/dialog";
import StopwatchDisplay from "./StopwatchDisplay";
import {DialogActionTrigger} from "../../ui/dialog";


export function StopWatch(props:{children?:React.ReactNode,task?:string}) {
    // 開いているダイアログ、開いていないダイアログを区別
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    // const [isDisplayOpen, setIsDisplayOpen] = React.useState(false);
    // ストップウォッチの状態を管理
    const {
        currentTime,
        isRunning,
        startStopwatch,
        resetStopwatch,
        setIsMinimum,
        isMinimum
    } = useStopwatchContext();

    // ストップウォッチ終了処理
    const finishStopwatch = ()=>{
        // setIsMinimum(false);
        resetStopwatch((currentTime)=>{
            alert(currentTime)
        });
    };

    return (
        <>
            {isRunning && isMinimum && isDialogOpen &&
                <Portal>
                    <StopwatchDisplay
                        time={formatStopWatchTime(currentTime)}
                        task={props.task}
                        onFinish={finishStopwatch}
                    />
                </Portal>
            }
            <MyDialog.Root
                closeOnInteractOutside={false}
                onOpenChange={(details: OpenChangeDetails)=>{
                    setIsDialogOpen(!details.open);
                    setIsMinimum(!details.open);
                }}
            >
                <MyDialog.Trigger>
                    <Box>{props.children}</Box>
                </MyDialog.Trigger>
                <MyDialog.Content>
                    <MyDialog.Header>ストップウォッチ</MyDialog.Header>
                    <MyDialog.Body>
                        <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
                            {formatStopWatchTime(currentTime)}
                        </h2>
                        {props.task && <p style={{ marginTop: "1rem" }}>タスク: {props.task}</p>}
                    </MyDialog.Body>
                    <MyDialog.Footer>
                        <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem"}}>
                            {isRunning ? (
                                <DialogActionTrigger>
                                    <Button onClick={finishStopwatch} variant="outline" colorPalette="red">
                                        終了
                                    </Button>
                                </DialogActionTrigger>

                            ) : (
                                <Button onClick={startStopwatch} variant="solid" colorPalette="green">
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