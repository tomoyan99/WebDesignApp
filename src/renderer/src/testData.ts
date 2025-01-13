import {TaskItemNoHush} from "./context/TaskContext";
import {MySessions} from "./context/SessionContext";

export const testSessions: MySessions = [
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
    ]
];

export const testTasks:TaskItemNoHush[] = [
    {
        date_unix:1234567768,
        task:"食べる"
    },
    {
        date_unix:1234567768,
        task:"食べる"
    },
    {
        date_unix:1234567768,
        task:"食す"
    },
    {
        date_unix:1234567768,
        task:"食む"
    },
    {
        date_unix:2783423840,
        task:"食べる"
    },

];

// ニュースデータ
export const newsData = [
    {
        title: "Google、最新のAI研究成果を発表",
        content: "言語モデルの性能向上と省エネルギー化に成功\n産業応用に向けた実証実験を各地で進行中",
    },
    {
        title: "米中貿易摩擦が再燃",
        content: "半導体の輸出規制を巡り両国の対立が深刻化\nサプライチェーン再編への影響が懸念される",
    },
    {
        title: "欧州委員会、データ保護強化へ",
        content: "個人データの越境移転ルールの見直しを検討\n企業に対する制裁金引き上げが議題に上がる",
    },
    {
        title: "メタバース関連企業に投資が集中",
        content: "大手IT企業が関連スタートアップを次々買収\n仮想空間上の新サービスで競争が激化",
    },
    {
        title: "中国、先端半導体製造技術の開発に注力",
        content: "国内の研究機関と企業が共同研究を拡大\n製造プロセスの国産化を加速する方針",
    },
    {
        title: "日本政府、サイバー防衛の強化策を策定",
        content: "官民連携によりセキュリティ教育を充実化\nAIを活用した防御システム導入を検討",
    },
    {
        title: "ロシアとウクライナ情勢、依然として緊迫",
        content: "停戦交渉の行方が不透明なまま戦闘が長期化\n国際社会は人道支援と外交努力を強める",
    },
    {
        title: "アメリカ、AI関連規制の整備進む",
        content: "個人情報の保護や差別防止措置を強化\n業界からはイノベーション阻害を懸念する声",
    },
    {
        title: "インド、デジタル決済インフラを世界に展開",
        content: "独自の決済システムUPIが国際展開を加速\n新興国での利用拡大が期待される",
    },
    {
        title: "EU、データ共通基盤『GAIA-X』の推進",
        content: "欧州主導のクラウドプラットフォーム構築へ\nビッグデータ活用と主権保護の両立図る",
    },
    {
        title: "韓国、バイオテクノロジー投資を拡大",
        content: "医薬品・再生医療分野に政府支援を集中\nアジアの研究開発拠点として存在感高まる",
    },
    {
        title: "中東情勢、地域安定化への国際会議を開催",
        content: "エネルギー確保とテロ対策を主な議題に協議\n各国の利害調整を巡り交渉が続く",
    },
];

