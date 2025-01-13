export function convUnixOnlyDate(date_unix: number) {
    const nowDate = new Date(date_unix);
    const month = `${nowDate.getMonth() + 1}`.padStart(2, "0");
    const date = `${nowDate.getDate()}`.padStart(2, "0");
    return `${month}月${date}日`;
}