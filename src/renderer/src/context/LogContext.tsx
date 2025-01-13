import React, { createContext, useContext, useState, ReactNode } from "react";

/**
 * ユーザーが入力した JSON の構造を想定
 */
export interface LogJsonData {
  reply?: { id: number; content: string }[];
  result?: string[];
  news?: string[];
}

/**
 * LogContext が管理するデータ
 */
interface LogContextType {
  news: string[];
  reply: { id: number; content: string }[];
  result: string[];

  // JSONパース後に、news/reply/resultを追加する関数
  addLogData: (data: LogJsonData) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

/**
 * LogProvider:
 *  - news, reply, result を状態管理
 *  - addLogData() で新しい情報を追加
 */
export function LogProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<string[]>([]);
  const [reply, setReply] = useState<{ id: number; content: string }[]>([]);
  const [result, setResult] = useState<string[]>([]);

  // JSON データを受け取り、既存の状態にマージする
  const addLogData = (data: LogJsonData) => {
    if (data.news) {
      setNews((prev) => [...prev, ...(data.news ?? [])]);
    }
    if (data.reply) {
      setReply((prev) => [...prev, ...(data.reply ?? [])]);
    }
    if (data.result) {
      setResult((prev) => [...prev, ...(data.result ?? [])]);
    }
  };

  return (
    <LogContext.Provider value={{ news, reply, result, addLogData }}>
      {children}
    </LogContext.Provider>
  );
}

/**
 * コンテキストを使うためのカスタムフック
 */
export function useLogContext() {
  const ctx = useContext(LogContext);
  if (!ctx) {
    throw new Error("useLogContext must be used within a LogProvider");
  }
  return ctx;
}
