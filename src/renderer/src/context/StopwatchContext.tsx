import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    ReactNode,
    useCallback
  } from 'react';
  
  // ストップウォッチの状態
  type StopwatchState = {
    isRunning: boolean;
    startTime: number; // ストップウォッチを開始した時刻 (Date.now() など)
    elapsed: number;   // 一時停止も含めた累積経過時間(ミリ秒)
  };
  
  // Context に保持するデータ・操作
  type StopwatchContextType = {
    // 現在の状態
    isRunning: boolean;
    currentTime: number;   // 現在の「累積ミリ秒」
    // 操作系関数
    startStopwatch: () => void;
    stopStopwatch: () => void;
    resetStopwatch: () => void;
  };
  
  // デフォルト値をとりあえず設定
  const StopwatchContext = createContext<StopwatchContextType>({
    isRunning: false,
    currentTime: 0,
    startStopwatch: () => {},
    stopStopwatch: () => {},
    resetStopwatch: () => {},
  });
  
  // useContext で取り出しやすいようにフックを作る
  export const useStopwatchContext = () => {
    return useContext(StopwatchContext);
  };
  
  // Provider コンポーネント
  export const StopwatchProvider = ({ children }: { children: ReactNode }) => {
    const [stopwatchState, setStopwatchState] = useState<StopwatchState>({
      isRunning: false,
      startTime: 0,
      elapsed: 0,
    });
  
    // リアルタイム更新用の interval の管理;
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
    // currentTime: elapsed + (今の時刻 - 開始時刻)
    const currentTime = stopwatchState.isRunning
      ? stopwatchState.elapsed + (Date.now() - stopwatchState.startTime)
      : stopwatchState.elapsed;
  
    const startStopwatch = useCallback(() => {
      if (stopwatchState.isRunning) return; // 連打防止
      setStopwatchState((prev) => ({
        ...prev,
        isRunning: true,
        startTime: Date.now(), // 今の時刻をセット
      }));
    }, [stopwatchState.isRunning]);
  
    const stopStopwatch = useCallback(() => {
      if (!stopwatchState.isRunning) return;
      const stopTime = Date.now();
      setStopwatchState((prev) => ({
        isRunning: false,
        startTime: 0,
        elapsed: prev.elapsed + (stopTime - prev.startTime),
      }));
    }, [stopwatchState.isRunning, stopwatchState.startTime]);
  
    const resetStopwatch = useCallback(() => {
      setStopwatchState({
        isRunning: false,
        startTime: 0,
        elapsed: 0,
      });
    }, []);
  
    // isRunning === true の時だけ、一定間隔で再描画を促す → currentTime をリアルタイムに更新
    useEffect(() => {
      if (stopwatchState.isRunning) {
        intervalRef.current = setInterval(() => {
          setStopwatchState((prev) => ({ ...prev })); // state を更新して再描画
        }, 250); // 0.25秒間隔などで適宜変更可
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      return () => {
        // unmount でクリア
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [stopwatchState.isRunning]);
  
    const value: StopwatchContextType = {
      isRunning: stopwatchState.isRunning,
      currentTime,
      startStopwatch,
      stopStopwatch,
      resetStopwatch,
    };
  
    return (
      <StopwatchContext.Provider value={value}>
        {children}
      </StopwatchContext.Provider>
    );
  };
  