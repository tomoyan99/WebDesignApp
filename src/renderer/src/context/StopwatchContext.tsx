import React, { useState, useRef, useEffect, useCallback, useContext, createContext } from 'react';

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
}

// StopwatchContext を作成し、状態と操作を提供する
const StopwatchContext = createContext<StopwatchContextType | undefined>(undefined);

// カスタムフック: useStopwatchContext
// StopwatchContext からデータと操作を取得する
export const useStopwatchContext = (): StopwatchContextType => {
  const context = useContext(StopwatchContext);

  // コンテキストが正しく提供されていない場合はエラーをスロー
  if (!context) throw new Error('useStopwatchContext must be used within a StopwatchProvider');

  return context;
};

// ストップウォッチの状態と操作を提供する Provider コンポーネント
export const StopwatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ストップウォッチの状態を管理
  const [state, setState] = useState<StopwatchState>({
    isRunning: false,  // 初期状態では停止中
    startTime: 0,      // 初期の開始時刻は0
    elapsed  : 0,        // 初期の経過時間は0
    isMinimum: false,  // 初期状態では最小化されていない
  });

  // タイマーの参照
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // 現在の経過時間を計算
  const currentTime = state.isRunning
      ? state.elapsed + (Date.now() - state.startTime)  // ストップウォッチが動作中ならば、開始時刻から現在までの経過時間を加算
      : state.elapsed;  // 停止中は経過時間をそのまま使用

  // ストップウォッチを開始する関数
  const startStopwatch = useCallback(() => {
    // 既に動作中なら何もしない
    if (state.isRunning) return;

    // 動作中状態に更新し、開始時刻を現在の時刻に設定
    setState({
      isRunning : true,
      startTime : Date.now(),
      elapsed   : state.elapsed,
      isMinimum : state.isMinimum, // 最小化状態を保持
    });
  }, [state.isRunning, state.elapsed, state.isMinimum]);  // isRunning, elapsed, isMinimum が変更された時に再評価

  // ストップウォッチをリセットする関数
  const resetStopwatch = useCallback((callback?:(currentTime:number)=>void) => {
    callback!(currentTime);
    // 経過時間や開始時刻をリセット
    setState({
      isRunning: false,
      startTime: 0,
      elapsed: 0,
      isMinimum:false, // 最小化状態をリセット
    });
  }, [state.isMinimum]);  // isMinimum が変更された時に再評価

  // ストップウォッチ終了処理
  // 中身いじってね
  const finishStopwatch = useCallback(()=>{
    setIsMinimum(false);
    resetStopwatch((currentTime)=>{
      alert(currentTime)
    });
  },[]);

  // 最小化状態を設定する関数（引数にbooleanを受け取る）
  const setIsMinimum = useCallback((value: boolean) => {
    setState((prev) => ({
      ...prev,
      isMinimum: value,  // 引数に渡された値で最小化状態を設定
    }));
  }, []);

  // ストップウォッチが動作中のときだけ、一定間隔で状態を更新
  useEffect(() => {
    if (state.isRunning) {
      // 動作中なら、250ミリ秒ごとに状態を更新
      intervalRef.current = setInterval(() => setState((prev) => ({ ...prev })), 250);
    } else if (intervalRef.current) {
      // 停止中なら、インターバルをクリア
      clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    }

    // クリーンアップ: コンポーネントがアンマウントされたときにインターバルをクリア
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
      }
    };
  }, [state.isRunning]);  // isRunning が変更されたときに再評価

  // Context に渡す値を準備
  const contextValue = {
    isRunning: state.isRunning,   // ストップウォッチの動作状態
    currentTime,                  // 現在の経過時間
    isMinimum: state.isMinimum,   // 最小化状態
    startStopwatch,               // ストップウォッチ開始関数
    finishStopwatch,              // ストップウォッチ停止関数
    resetStopwatch,               // ストップウォッチリセット関数
    setIsMinimum,                 // 最小化状態を切り替える関数
  };

  // StopwatchContext.Provider で子コンポーネントに状態を提供
  return <StopwatchContext.Provider value={contextValue}>{children}</StopwatchContext.Provider>;
};
