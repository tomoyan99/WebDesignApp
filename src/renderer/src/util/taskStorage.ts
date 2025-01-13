import { TaskItem } from "../context/TaskContext";

const TASKS_KEY = "task_data";

// タスクを保存する（ローカルストレージ）
export const saveTasksToStorage = (tasks: TaskItem[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// タスクを読み込む（ローカルストレージ）
export const loadTasksFromStorage = (): TaskItem[] => {
  const tasksJSON = localStorage.getItem(TASKS_KEY);
  if (tasksJSON) {
    const tasks: TaskItem[] = JSON.parse(tasksJSON);

    // 期限切れのタスクをフィルタリング
    const now = Date.now();
    return tasks.filter((task) => task.date_unix > now);
  }
  return [];
};
