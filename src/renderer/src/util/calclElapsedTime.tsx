
// UNIXタイムスタンプ（秒単位）を受け取り、時間、分、秒に分解
function calclElapsedTime(timestamp: number) {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = timestamp % 60;

    let timeString = "";
    if (hours > 1) {
        timeString += `${hours}時間`;
    }
    if (minutes > 1) {
        timeString += `${minutes}分`
    }
    return `${timeString}+${seconds}秒`;
}

export default calclElapsedTime;
