import React, { createContext, useContext, useState, ReactNode } from 'react';

// タスクの型定義
export interface TaskProps {
    date_unix: number;
    task: string;
}

// Context の型定義
interface TaskContextProps {
    taskData: TaskProps[]; // タスクの配列
    taskList: string[]; // タスク名のリスト
    taskNow: TaskProps | null; // 現在選択されているタスク
    addTask: (newTask: TaskProps[]) => boolean; // タスク追加関数
    setTaskNow: React.Dispatch<React.SetStateAction<TaskProps | null>>; // 現在選択されたタスクを設定する関数
}

// Context の初期値
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Provider の作成
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [taskData, setTaskData] = useState<TaskProps[]>([]); // タスク配列の状態管理
    const [taskNow, setTaskNow] = useState<TaskProps | null>(null); // 現在選択されているタスクの状態管理

    // タスク名リストを動的に取得
    const taskList = taskData.map((task) => task.task);

    const addTask = (newTasks: TaskProps | TaskProps[]) => {
        // 配列でない場合は配列に変換
        const tasksToAdd = Array.isArray(newTasks) ? newTasks : [newTasks];

        setTaskData((prev) => {
            // `Map` を使って既存のタスクを一意に保持する
            const taskMap = new Map(prev.map((task) => [`${task.date_unix}-${task.task}`, task]));

            // 重複を除外した新しいタスクを取得
            const uniqueTasks = tasksToAdd.filter(
                (newTask) => !taskMap.has(`${newTask.date_unix}-${newTask.task}`)
            );

            if (uniqueTasks.length === 0) {
                return prev; // 追加するタスクがない場合は状態をそのまま返す
            }

            // 新しいタスクを追加して更新
            return [...prev, ...uniqueTasks];
        });

        return true;
    };

    return (
        <TaskContext.Provider value={{ taskData, taskList, taskNow, addTask, setTaskNow }}>
            {children}
        </TaskContext.Provider>
    );
};

// Context を利用するカスタムフック
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
