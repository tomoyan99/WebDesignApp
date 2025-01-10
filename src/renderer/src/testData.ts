import {Sessions} from "./components/Areas/SessionArea";
import {getImage} from "./util/getImage";

export const test_sessions :Sessions[] = [
    {
        start_unix:1609426800,
        stop_unix :1609513200,
        start_iso :"2020-01-01 00:00:00",
        stop_iso  :"2020-01-02 00:00:00",
        topics:[
            {
                date_unix: 1609426860,
                date_iso: "2020-01-03 00:00:00",
                post: "あいうえおあいうえお\nあいうえおあいうえおあいうえお",
                reply: {
                    date_unix: 1609426860,
                    date_iso: "2020-01-03 00:00:00",
                    name: "トドりん",
                    id: "todorin1122",
                    avatar: getImage("todo.png"),
                    message:
                        "これはクライアントには出せないかなぁ。\n" +
                        "帰属意識は大事だけど視野狭窄になってない？\n" +
                        "昇格はちょっと厳しくなったかもね。\n"
                },
            }
        ],
    }
];