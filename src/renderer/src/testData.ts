import {Sessions} from "./components/Areas/SessionArea";
import {getImage} from "./util/getImage";
import {TaskProps} from "./components/Areas/TaskArea";

export const test_sessions :Sessions[] = [
    {
        start_unix:1609426800,
        stop_unix :1609513200,
        start_iso :"2020-01-01 00:00:00",
        stop_iso  :"2020-01-02 00:00:00",
        task      :"食べる",
        posts:[
            {
                date_unix: 1609426860,
                date_iso: "2020-01-03 00:00:00",
                postMessage: "あいうえおあいうえお\nあいうえおあいうえおあいうえお",
                reply: {
                    date_unix: 1609426860,
                    date_iso: "2020-01-03 00:00:00",
                    replyName: "トドりん",
                    replyId: "todorin1122",
                    avatar: getImage("todo.png"),
                    message:
                        "これはクライアントには出せないかなぁ。\n" +
                        "帰属意識は大事だけど視野狭窄になってない？\n" +
                        "昇格はちょっと厳しくなったかもね。\n"
                },
            }
        ],
    },
    {
        posts:[
            {
                date_unix: 1609426860,
                date_iso: "2020-01-03 00:00:00",
                postMessage: "あいうえおあいうえお\nあいうえおあいうえおあいうえお",
                reply: {
                    date_unix: 1609426860,
                    date_iso: "2020-01-03 00:00:00",
                    replyName: "トドりん",
                    replyId: "todorin1122",
                    avatar: getImage("todo.png"),
                    message:
                        "これはクライアントには出せないかなぁ。\n" +
                        "帰属意識は大事だけど視野狭窄になってない？\n" +
                        "昇格はちょっと厳しくなったかもね。\n"
                },
            }
        ]
    }
];

export const test_tasks:TaskProps[] = [
    {
        date_unix:1234567768,
        content:"食べる"
    },
    {
        date_unix:1234567768,
        content:"食べる"
    },
];

export const test_news:string[]=[
    // "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
    // "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
    // "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
    // "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
    // "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
]