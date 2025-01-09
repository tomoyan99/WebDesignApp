function toUnix(str:string):number{
    // 余分なスペースを削除
    const cleanedDateString = str.replace(/\s*,\s*/, ' ');
    // Date オブジェクトに変換
    const date = new Date(cleanedDateString);
    // UNIXタイムスタンプ（秒単位）に変換
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
}

["2021-01-01 ,00:00:00","2021-01-02 ,00:00:00","2021-01-01 ,00:01:00","2021-01-01 ,00:02:00"].map((d)=>{
    console.log(toUnix(d));
});
