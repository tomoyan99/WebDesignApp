
// UNIXタイムスタンプの差分（秒単位）を受け取り
function calcElapsedTime(elapsed_unix:number) {
    const timestamp = elapsed_unix/1000;
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor(timestamp % 60);

    let timeString = "";
    if (hours > 1) {
        timeString += `${hours}時間`;
    }
    if (minutes > 1) {
        timeString += `${minutes}分`
    }
    return `${timeString}${seconds}秒`;
}

export default calcElapsedTime;
