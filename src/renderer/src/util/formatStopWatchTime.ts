// 時間のフォーマット
// ミリ秒をhh:mm:ssに変換
export const formatStopWatchTime = (time: number) => {
    // 分秒に変換
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);

    const hours_str = `${String(hours).padStart(2, "0")}`;
    const minutes_str = `${String(minutes).padStart(2, "0")}`;
    const seconds_str = `${String(seconds).padStart(2, "0")}`;

    return `${hours_str}:${minutes_str}:${seconds_str}`;
};
