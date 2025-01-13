// 実行例
import {fetchSessionsAsJson} from "./dbRead";
import {db} from "./dbReact";
import {setupDatabase} from "./dbCreate";
import {MySessions} from "./SessionTypes";
import {saveSessionsToDB} from "./dbWrite";

const testData :MySessions=[
    [
        {
            type: "start",
            date_unix: 1673520000,
            date_iso: "2023-01-12 08:00:00",
            message: "セッション開始",
            task: "タスク1"
        },
        {
            type: "post",
            date_unix: 1673521800,
            date_iso: "2023-01-12 08:30:00",
            message: "進捗状況を確認",
            reply: {
                message: "確認完了",
                date_unix: 1673523000,
                date_iso: "2023-01-12 09:00:00"
            }
        },
        {
            type: "end",
            date_unix: 1673526000,
            date_iso: "2023-01-12 09:30:00",
            message: "セッション終了",
            elapsed: 5400,
            task: "タスク1"
        }
    ],
    [
        {
            type: "post",
            date_unix: 1673610000,
            date_iso: "2023-01-13 10:00:00",
            message: "投稿のみのセッション"
        }
    ],
    [
        {
            type: "start",
            date_unix: 1673700000,
            date_iso: "2023-01-14 12:00:00",
            message: "別のセッション開始"
        },
        {
            type: "end",
            date_unix: 1673703600,
            date_iso: "2023-01-14 13:00:00",
            message: "作業終了",
            elapsed: 3600
        }
    ]
];

(async () => {
    try{
        await setupDatabase();
        await saveSessionsToDB(testData);

        const jsonData = await fetchSessionsAsJson();
        console.log(JSON.stringify(jsonData, null, 2));
    } catch (error) {
        console.error("Error fetching sessions:", error);
    } finally {
        await db.destroy();
    }
})();
