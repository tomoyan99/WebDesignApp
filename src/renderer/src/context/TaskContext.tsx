import {createContext, ReactNode, useContext, useState} from 'react';

// タスクの型定義
export interface TaskItem {
    date_unix: number;
    task: string;
    task_hush:string, // date_unix-taskっていうふうにする
}
// ハッシュなし
export type TaskItemNoHush = Omit<TaskItem, 'task_hush'>;

// Context の型定義
interface TaskContextProps {
    taskData: TaskItem[]; // タスクの配列
    taskList: string[]; // タスク名のリスト
    taskNow: TaskItem | null; // 現在選択されているタスク
    addTask: (newTask: TaskItem[]) => boolean; // タスク追加関数
    taskNowHandler: (task:TaskItem|null)=>void; // 現在選択されたタスクを設定する関数
}

// ハッシュを生成する関数
export const generateTaskHash = (task:TaskItemNoHush|TaskItem): string => {
    // 簡易的にtaskの内容を基にハッシュを生成
    return `${task.date_unix}-${task.task}`;
};


// Context の初期値
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Provider の作成
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [taskData, setTaskData] = useState<TaskItem[]>([]); // タスク配列の状態管理
    const [taskNow, setTaskNow] = useState<TaskItem | null>(null); // 現在選択されているタスクの状態管理

    // タスク名リストを動的に取得
    const taskList = taskData.map((task) => task.task);

    const addTask = (newTasks: TaskItemNoHush|TaskItemNoHush[]) => {
        // 配列でない場合は配列に変換
        const tasksToAdd = Array.isArray(newTasks) ? newTasks : [newTasks];

        setTaskData((prev) => {
            // `Map` を使って既存のタスクを一意に保持する
            const taskMap = new Map(prev.map((task) => [generateTaskHash(task),task]));
            // 重複を除外した新しいタスクを取得
            tasksToAdd.forEach((newTask) => {
                taskMap.set(generateTaskHash(newTask),{...newTask,task_hush:generateTaskHash(newTask)})
            });
            // 新しいタスクを追加して更新
            return Array.from(taskMap.values());
        });
        return true;
    };
    const taskNowHandler = (task: TaskItem | null) => {
        setTaskNow(task);
    }
    return (
        <TaskContext.Provider value={{ taskData, taskList, taskNow, addTask,taskNowHandler }}>
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
