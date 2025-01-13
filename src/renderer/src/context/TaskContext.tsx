import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loadTasksFromStorage, saveTasksToStorage } from "../util/taskStorage";

// タスクの型定義（変更なし）
export interface TaskItem {
  date_unix: number;
  task: string;
  task_hush: string; // date_unix-task
}

interface TaskContextProps {
  taskData: TaskItem[];
  taskList: string[];
  taskNow: TaskItem | null;
  addTask: (newTask: TaskItem[]) => boolean;
  taskNowHandler: (task: TaskItem | null) => void;
}

// ハッシュ生成関数（変更なし）
export const generateTaskHash = (task: Omit<TaskItem, "task_hush">): string => {
  return `${task.date_unix}-${task.task}`;
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [taskData, setTaskData] = useState<TaskItem[]>(loadTasksFromStorage());
  const [taskNow, setTaskNow] = useState<TaskItem | null>(null);

  const taskList = taskData.map((task) => task.task);

  const addTask = (newTasks: Omit<TaskItem, "task_hush"> | Omit<TaskItem, "task_hush">[]) => {
    const tasksToAdd = Array.isArray(newTasks) ? newTasks : [newTasks];

    setTaskData((prev) => {
      const taskMap = new Map(prev.map((task) => [generateTaskHash(task), task]));
      tasksToAdd.forEach((task) =>
        taskMap.set(generateTaskHash(task), { ...task, task_hush: generateTaskHash(task) })
      );
      const updatedTasks = Array.from(taskMap.values());

      // 保存
      saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
    return true;
  };

  const taskNowHandler = (task: TaskItem | null) => {
    setTaskNow(task);
  };

  // 初回読み込み時に期限切れタスクを削除
  useEffect(() => {
    const validTasks = taskData.filter((task) => task.date_unix > Date.now());
    if (validTasks.length !== taskData.length) {
      setTaskData(validTasks);
      saveTasksToStorage(validTasks);
    }
  }, []);

  return (
    <TaskContext.Provider value={{ taskData, taskList, taskNow, addTask, taskNowHandler }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
