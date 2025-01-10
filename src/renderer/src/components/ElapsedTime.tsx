type ElapsedTimeProps = {
    timestamp: number; // UNIXタイムスタンプ（秒単位）
};

function ElapsedTime({timestamp}:ElapsedTimeProps) {
    // 秒を受け取り、時間、分、秒に分解
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = timestamp % 60;

    return (
        <>
            {hours > 1 && `${hours}時間`}
            {minutes > 1 && `${minutes}分`}
            {`${seconds}秒`}
        </>
    );
}

export default ElapsedTime;
