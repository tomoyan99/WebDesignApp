import { MySessions} from "../context/SessionContext";

const SESSIONS_KEY = "session_data";

// セッションの保存をクリアする（ローカルストレージ）
export const clearSessionsToStorage = (): void => {
  localStorage.setItem(SESSIONS_KEY,"");
};

// セッションを保存する（ローカルストレージ）
export const saveSessionsToStorage = (sessions:MySessions): void => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

// セッションを読み込む（ローカルストレージ）
export const loadSessionsFromStorage = (): MySessions => {
  const sessionsJSON = localStorage.getItem(SESSIONS_KEY);
  if (sessionsJSON) {
    return JSON.parse(sessionsJSON) as MySessions;
  }
  return [];
};
