import {db} from "./dbReact";
import {MySessions} from "./SessionTypes";

export async function saveSessionsToDB(sessions: MySessions) {
    try {
        // トランザクションを開始
        await db.transaction(async (trx) => {
            for (const session of sessions) {
                let sessionId: number | undefined;

                for (const item of session) {
                    if (item.type === "start" || item.type === "end") {
                        // セッションデータを挿入
                        const [newSessionId] = await trx("sessions").insert({
                            type: item.type,
                            date_unix: item.date_unix,
                            date_iso: item.date_iso,
                            message: item.message,
                            task: item.task ?? null,
                            elapsed: "elapsed" in item ? item.elapsed : null,
                        });

                        // セッションIDを保存
                        sessionId = newSessionId;
                    } else if (item.type === "post" && sessionId) {
                        // 投稿データを挿入
                        const [newPostId] = await trx("posts").insert({
                            session_id: sessionId,
                            type: item.type,
                            date_unix: item.date_unix,
                            date_iso: item.date_iso,
                            message: item.message,
                        });

                        // 返信データを挿入
                        if (item.reply) {
                            await trx("replies").insert({
                                post_id: newPostId,
                                message: item.reply.message,
                                date_unix: item.reply.date_unix,
                                date_iso: item.reply.date_iso,
                            });
                        }
                    }
                }
            }
        });

        console.log("セッションデータを正常に保存しました！");
    } catch (error) {
        console.error("セッションデータの保存中にエラーが発生しました:", error);
    }
}