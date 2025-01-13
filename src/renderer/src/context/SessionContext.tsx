import React, { createContext, useContext, useState, useCallback } from "react";

// 型定義

export type MySessionItemStart = {
    type: "start"; // アイテムの種類（開始）
    date_unix: number; // Unixタイムスタンプ
    date_iso: string; // ISO形式の日付
    message: string; // メッセージ
    task?: string; // タスク情報（オプション）
}

export type MySessionItemEnd = {
    type:"end", // アイテムの種類（終了）
    date_unix: number; // Unixタイムスタンプ
    date_iso: string; // ISO形式の日付
    message: string; // メッセージ
    task?: string; // タスク情報（オプション）
    elapsed: number; // 経過時間（endの場合）
}

export type MySessionItemPost = {
    type: "post"; // アイテムの種類（投稿）
    date_unix: number;
    date_iso: string;
    message: string;
    reply?: MyReplyInfo; // 返信情報（オプション）
}

// セッション内の各アイテムを表す型
export type MySessionItem = MySessionItemStart | MySessionItemEnd | MySessionItemPost;

// 返信情報の型
export type MyReplyInfo = {
    message: string; // 返信のメッセージ
    date_unix: number;
    date_iso: string;
};

// セッションとセッションリストの型
export type MySession = MySessionItem[]; // セッションはSessionItemの配列
export type MySessions = MySession[]; // 複数のセッションを管理

// コンテキストのインターフェース
type SessionContextType = {
    sessionData: MySessions; // 全セッションデータ
    sessionNow: MySession | null; // 現在進行中のセッション
    isRunningSession: boolean; // セッションが進行中かどうか
    startSession: (message: string, task?: string) => void; // セッション開始関数
    addPost: (message: string, reply?: MyReplyInfo) => void; // 投稿追加関数
    endSession: (message: string) => void; // セッション終了関数
    initializeSession: (initialData: MySessions) => void; // セッションの初期化関数
};

// コンテキスト作成
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 全セッションデータを管理する状態
    const [sessionData, setSessionData] = useState<MySessions>([]);
    // 現在進行中のセッションを管理する状態
    const [sessionNow, setSessionNow] = useState<MySession | null>(null);
    // 最新の sessionNow を保持するための useRef
    const sessionNowRef = React.useRef<MySession | null>(sessionNow);

    // sessionNow が変更されるたびに ref を更新
    React.useEffect(() => {
        sessionNowRef.current = sessionNow;
    }, [sessionNow]);

    // セッションが進行中かを判定
    const isRunningSession = !!sessionNow;

    // セッションを開始する関数
    const startSession = useCallback((message: string, task?: string) => {
        const startItem: MySessionItem = {
            type: "start",
            date_unix: Date.now(),
            date_iso: new Date().toISOString(),
            message,
            task,
        };
        const newSession: MySession = [startItem]; // 新しいセッションを作成
        setSessionNow(newSession); // 現在のセッションを更新

        // データを逆順で保存
        setSessionData((prev) => [newSession,...prev]); // 全セッションデータに追加
    }, [sessionNow]);

    const addPost = useCallback((message: string, reply?: MyReplyInfo) => {
        const postItem: MySessionItem = {
            type: "post",
            date_unix: Date.now(),
            date_iso: new Date().toISOString(),
            message,
            reply,
        };

        // 最新の sessionNow を参照して状態を更新
        if (sessionNowRef.current) {
            const updatedSession = [...sessionNowRef.current, postItem];
            setSessionNow(updatedSession);
            setSessionData((prev) =>
                prev.map((session) =>
                    session === sessionNowRef.current ? updatedSession : session
                )
            );
        } else {
            const newSession: MySession = [postItem];
            setSessionNow(newSession);
            setSessionData((prev) => [newSession, ...prev]);
        }
    }, []);


    // セッションを終了する関数
    const endSession = useCallback((message: string) => {
        if (!sessionNow) return; // セッションがない場合は何もしない

        const startItem = sessionNow[0]; // セッションの開始アイテム
        const endItem: MySessionItemEnd = {
            type: "end",
            date_unix: Date.now(),
            date_iso: new Date().toISOString(),
            message,
            elapsed: Date.now() - startItem.date_unix,
        };

        // 現在のセッションに終了アイテムを追加
        setSessionNow((prev) => (prev ? [...prev, endItem] : null));
        setSessionData((prev) =>
            prev.map((session) => (session === sessionNow ? [...session, endItem] : session))
        );
        setSessionNow(null); // 現在のセッションをリセット
    }, [sessionNow]);

    // セッションを初期化する関数
    const initializeSession = useCallback((initialData: MySessions) => {
        setSessionData(initialData); // セッションデータを初期化
        setSessionNow(null); // 現在のセッションをリセット
    }, []);

    return (
        <SessionContext.Provider
            value={{
                sessionData,
                sessionNow,
                isRunningSession,
                startSession,
                addPost,
                endSession,
                initializeSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

// コンテキストを利用するカスタムフック
export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
};
