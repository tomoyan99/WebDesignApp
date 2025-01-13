import {db} from "./dbReact";
import {MySessions} from "./SessionTypes";

export async function fetchSessionsAsJson() {
    // Step 1: session_data サブクエリ
    const sessionData = db("sessions")
        .select(
            "id as session_id",
            "type",
            "date_unix",
            "date_iso",
            "message",
            "task",
            "elapsed"
        );

    // Step 2: post_data サブクエリ
    const postData = db("posts as p")
        .select(
            "p.session_id",
            "p.type",
            "p.date_unix",
            "p.date_iso",
            "p.message",
            "r.message as reply_message",
            "r.date_unix as reply_date_unix",
            "r.date_iso as reply_date_iso"
        )
        .leftJoin("replies as r", "p.id", "r.post_id");

    // Step 3: combined_data サブクエリ
    const combinedData = db
        .from(sessionData.as("sd"))
        .leftJoin(postData.as("pd"), "sd.session_id", "pd.session_id")
        .select(
            "sd.type as session_type",
            "sd.date_unix as session_date_unix",
            "sd.date_iso as session_date_iso",
            "sd.message as session_message",
            "sd.task as session_task",
            "sd.elapsed as session_elapsed",
            "pd.type as post_type",
            "pd.date_unix as post_date_unix",
            "pd.date_iso as post_date_iso",
            "pd.message as post_message",
            "pd.reply_message",
            "pd.reply_date_unix",
            "pd.reply_date_iso"
        );

    // Step 4: JSON 出力
    const result = await db
        .from(combinedData.as("cd"))
        .select(
            db.raw(`
        '[' || GROUP_CONCAT(
          '[' ||
          GROUP_CONCAT(
            CASE
              WHEN cd.post_type IS NULL THEN
                '{"type":"' || cd.session_type || '",' ||
                '"date_unix":' || cd.session_date_unix || ',' ||
                '"date_iso":"' || cd.session_date_iso || '",' ||
                '"message":"' || cd.session_message || '"' ||
                CASE WHEN cd.session_task IS NOT NULL THEN ',"task":"' || cd.session_task || '"' ELSE '' END ||
                CASE WHEN cd.session_elapsed IS NOT NULL THEN ',"elapsed":' || cd.session_elapsed ELSE '' END ||
                '}'
              ELSE
                '{"type":"' || cd.post_type || '",' ||
                '"date_unix":' || cd.post_date_unix || ',' ||
                '"date_iso":"' || cd.post_date_iso || '",' ||
                '"message":"' || cd.post_message || '",' ||
                CASE WHEN cd.reply_message IS NOT NULL THEN
                  '"reply":{"message":"' || cd.reply_message || '",' ||
                  '"date_unix":' || cd.reply_date_unix || ',' ||
                  '"date_iso":"' || cd.reply_date_iso || '"}' ELSE 'null' END ||
                '}'
            END
          )
          || ']'
        ) || ']' as json_output
      `)
        )
        .groupBy("cd.session_date_unix")
        .orderBy("cd.session_date_unix");

    return result.map((row: any) => JSON.parse(row.json_output)) as MySessions;
}

