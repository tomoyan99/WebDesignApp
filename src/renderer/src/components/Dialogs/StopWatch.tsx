import MyDialog from "../MyDialog";
import {Box} from "@chakra-ui/react";
import * as React from "react";
import { Button } from "../../ui/button";

export function StopWatch(props:{children?:React.ReactNode,task?:string}) {
    // ストップウォッチの状態を管理
    const [time, setTime] = React.useState(0); // 時間（ミリ秒）
    const [isRunning, setIsRunning] = React.useState(false); // 動作中かどうか

    // 時間を更新するエフェクト
    React.useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // 10ミリ秒ごとに加算
            }, 10);
        } else if (timer) {
            clearInterval(timer);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    // 時間のフォーマット
    const formatTime = (time: number) => {
        const milliseconds = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 60000) % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
            Math.floor(milliseconds / 10)
        ).padStart(2, "0")}`;
    };

    // 開始・停止・リセット操作
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <MyDialog.Root closeOnInteractOutside={false}>
            <MyDialog.Trigger>
                <Box>{props.children}</Box>
            </MyDialog.Trigger>
            <MyDialog.Content>
                <MyDialog.Header>ストップウォッチ</MyDialog.Header>
                <MyDialog.Body>
                    <h2 style={{ fontSize: "2rem", textAlign: "center" }}>{formatTime(time)}</h2>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
                        {isRunning ? (
                            <Button onClick={stop} variant="outline" colorScheme="red">
                                停止
                            </Button>
                        ) : (
                            <Button onClick={start} variant="solid" colorScheme="green">
                                開始
                            </Button>
                        )}
                        <Button onClick={reset} variant="outline" colorScheme="blue">
                            リセット
                        </Button>
                    </div>
                    {props.task && <p style={{ marginTop: "1rem" }}>タスク: {props.task}</p>}
                </MyDialog.Body>
                <MyDialog.Footer></MyDialog.Footer>
            </MyDialog.Content>
        </MyDialog.Root>
    );
}