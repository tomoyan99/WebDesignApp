import {format} from 'date-fns';


const convUnixToIso = (value:number) => {
    // UNIXタイムスタンプを Date オブジェクトに変換
    const date = new Date(value);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export default convUnixToIso;
