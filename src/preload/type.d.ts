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

export type API = {
    // セッション関連
    addSession: (session: MySessionItemStart | MySessionItemEnd) => Promise<number>;
    getSessions: () => Promise<MySessions>;
    startSession: (taskName: string) => Promise<number>;
    stopSession: (sessionId: number, note: string | null) => Promise<boolean>;

    // 投稿関連
    addPost: (post: MySessionItemPost) => Promise<number>;
    getPosts: () => Promise<MySessionItemPost[]>;

    // 返信関連
    addReply: (reply: MySessionItemPost['reply']) => Promise<number>;
    getReplies: () => Promise<MySessionItemPost['reply'][]>;

    // 総括関連
    getSummary: () => Promise<{
        tweets: MySessionItemPost[];
        sessions: MySessions;
    }>;
    markSummarized: (tweetIds: number[], sessionIds: number[]) => Promise<boolean>;
};
