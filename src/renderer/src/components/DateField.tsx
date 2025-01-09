import { format } from 'date-fns';

type DateFieldProps = {
    value: number; // UNIXタイムスタンプを受け取る
};

const DateField = ({ value }: DateFieldProps) => {
    // UNIXタイムスタンプを Date オブジェクトに変換
    const date = new Date(value * 1000); // 秒をミリ秒に変換
    return <>{format(date, 'yyyy-MM-dd HH:mm:ss')}</>;
};

export default DateField;
