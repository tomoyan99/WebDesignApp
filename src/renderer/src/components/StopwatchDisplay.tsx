// src/renderer/src/components/StopwatchDisplay.tsx
import React, { useState } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { useStopwatchContext } from '../context/StopwatchContext';

export default function StopwatchDisplay() {
  const { isRunning, currentTime, stopStopwatch } = useStopwatchContext();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");

  // 分秒に変換
  const totalSeconds = Math.floor(currentTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (!isRunning) {
    // 動作中のみ表示する場合は null を返して何も表示しない
    return null;
  }

  return (
    <Box
      position="fixed"
      top="10px"
      left="10px"
      bg="orange.100"
      p={2}
      borderRadius="md"
      boxShadow="md"
      zIndex={9999} // 常に前面に表示するため
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Text fontWeight="bold" fontSize="lg">
        {`${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}
      </Text>
      {/*
        停止ボタンを任意で置く（UIはお好みで）
      */}
    <IconButton
      aria-label="Stop"
      _icon={{ fontSize: "lg", color: "red.500" }} // スタイルオブジェクトを渡す
      onClick={() => stopStopwatch()}
      size="sm"
    />

    </Box>
  );
}
