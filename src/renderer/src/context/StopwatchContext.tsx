import React, { useState, useRef, useEffect, useCallback, useContext, createContext } from 'react';
import { useTaskContext } from './TaskContext'; // ★ taskNow を取得してデフォルトタスク名に使うなど

// ストップウォッチの状態を表す型
interface StopwatchState {
  isRunning : boolean;  // ストップウォッチが動作しているかどうか
  startTime : number;   // ストップウォッチが開始された時刻
  elapsed   : number;   // 経過時間
  isMinimum : boolean;  // ストップウォッチが最小化されているかどうか
}

// Context に保持するデータと操作を表す型
interface StopwatchContextType {
  currentTime: number;          // 現在の経過時間
  isRunning: boolean;           // ストップウォッチの状態（動作中かどうか）
  isMinimum: boolean;           // 最小化状態かどうか
  startStopwatch: () => void;   // ストップウォッチを開始する関数
  finishStopwatch: () => void;  // ストップウォッチを停止する関数
  resetStopwatch: (callback?:(currentTime:number)=>void) => void;  // ストップウォッチをリセットする関数
  setIsMinimum: (state:boolean) => void;  // 最小化状態を切り替える関数

  // ★ 追加: タスクの現在選択など
  taskNow?: {task: string}; // shapeを少し雑に
  // sessionId, note を管理するなら こちらで定義しても可
}

// StopwatchContext を作成し、状態と操作を提供する
const StopwatchContext = createContext<StopwatchContextType | undefined>(undefined);

// カスタムフック: useStopwatchContext
// StopwatchContext からデータと操作を取得する
export const useStopwatchContext = (): StopwatchContextType => {
  const context = useContext(StopwatchContext);

  if (!context) throw new Error('useStopwatchContext must be used within a StopwatchProvider');

  return context;
};

// ストップウォッチの状態と操作を提供する Provider コンポーネント
export const StopwatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { taskNow } = useTaskContext(); // 今選択しているタスク
  const [state, setState] = useState<StopwatchState>({
    isRunning: false,
    startTime: 0,
    elapsed  : 0,
    isMinimum: false,
  });

  // タイマーの参照
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // 現在の経過時間を計算
  const currentTime = state.isRunning
      ? state.elapsed + (Date.now() - state.startTime)
      : state.elapsed;

  // ストップウォッチを開始する関数
  const startStopwatch = useCallback(() => {
    if (state.isRunning) return;
    setState({
      isRunning : true,
      startTime : Date.now(),
      elapsed   : state.elapsed,
      isMinimum : state.isMinimum,
    });
  }, [state.isRunning, state.elapsed, state.isMinimum]);

  // ストップウォッチをリセットする関数
  const resetStopwatch = useCallback((callback?:(currentTime:number)=>void) => {
    if(callback) callback(currentTime);
    setState({
      isRunning: false,
      startTime: 0,
      elapsed: 0,
      isMinimum:false,
    });
  }, [state.isMinimum, currentTime]);

  // ストップウォッチ終了処理
  const finishStopwatch = useCallback(()=>{
    setIsMinimum(false);
    resetStopwatch((time)=>{
      console.log("Stopwatch final time:", time);
    });
  },[resetStopwatch]);

  const setIsMinimum = useCallback((value: boolean) => {
    setState((prev) => ({
      ...prev,
      isMinimum: value,
    }));
  }, []);

  // ストップウォッチが動作中のときだけインターバルで状態更新
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => setState((prev) => ({ ...prev })), 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
      }
    };
  }, [state.isRunning]);

  const contextValue: StopwatchContextType = {
    isRunning: state.isRunning,
    currentTime,
    isMinimum: state.isMinimum,
    startStopwatch,
    finishStopwatch,
    resetStopwatch,
    setIsMinimum,
    taskNow,
  };

  return <StopwatchContext.Provider value={contextValue}>{children}</StopwatchContext.Provider>;
};
