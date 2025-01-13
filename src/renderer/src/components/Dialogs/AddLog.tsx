import React, { useState } from "react";
import MyDialog from "../MyDialog";
import {Box, Button, HStack, Text, Textarea, VStack} from "@chakra-ui/react";
import { useLogContext } from "../../context/LogContext";

interface Props {
    closeDialog: () => void;
    isOpen: boolean;
}

export function AddLog(props: Props) {
    const { addLogData } = useLogContext();

    // 2ステップフロー管理用
    const [step, setStep] = useState<0 | 1>(0);

    // JSON入力欄
    const [jsonInput, setJsonInput] = useState("");

    // 通知用の状態
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // まとめ欄: ワンクリックコピー用サンプルテキスト
    const summaryText = `■ 本日のまとめ(仮)
「データベースから抽出予定」`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summaryText);
            setNotification({ message: "コピーしました", type: "success" });
        } catch (e) {
            console.error(e);
            setNotification({ message: "コピーできませんでした", type: "error" });
        }
    };

    const handleApplyJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            addLogData(parsed);
            setNotification({ message: "反映しました！", type: "success" });
            setJsonInput("");
            props.closeDialog();
            setStep(0);
        } catch (e) {
            setNotification({ message: "JSONのパースに失敗しました", type: "error" });
            console.error(e);
        }
    };

    return (
        <MyDialog.Root
            open={props.isOpen}
            closeOnInteractOutside={false}
            onOpenChange={(open) => {
                if (!open) {
                    setStep(0);
                    setJsonInput("");
                }
                props.closeDialog();
            }}
        >
            <MyDialog.Content bg="orange.50" w="500px">
                <MyDialog.Header>まとめ</MyDialog.Header>
                <MyDialog.Body>
                    {notification && (
                        <Box
                            p={2}
                            bg={notification.type === "success" ? "green.100" : "red.100"}
                            color={notification.type === "success" ? "green.800" : "red.800"}
                            mb={4}
                            rounded="md"
                        >
                            {notification.message}
                        </Box>
                    )}
                    {step === 0 ? (
                        <Box>
                            <Text whiteSpace="pre-wrap">{summaryText}</Text>
                            <HStack pt={10} justifyContent="right">
                                <Button
                                    colorScheme="blue"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCopy}
                                >
                                    まとめをコピー
                                </Button>

                                <Button
                                    colorScheme="orange"
                                    size="md"
                                    onClick={() => setStep(1)}
                                >
                                    次へ
                                </Button>
                            </HStack>
                        </Box>
                    ) : (
                        <Box>
                            <Text mb={2}>
                                ここに JSON を入力してください。以下の形式例:
                            </Text>
                            <Textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder={`{\n  "reply": [...],\n  "result": [...],\n  "news": [...]\n}`}
                                minH="200px"
                                bg="white"
                            />
                            <Button mt={3} colorScheme="green" onClick={handleApplyJson}>
                                反映
                            </Button>
                        </Box>
                    )}
                </MyDialog.Body>
                <MyDialog.Footer />
            </MyDialog.Content>
        </MyDialog.Root>
    );
}
