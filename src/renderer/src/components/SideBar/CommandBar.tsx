import {Box, HTMLChakraProps, IconButton, IconButtonProps, VStack} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SummarizeIcon from "@mui/icons-material/Summarize"; // ★総括用アイコン
import {useTheme} from "@mui/material/styles";
import {useMyDialog} from "../../context/DialogsContext";

/* 
  CommandBar (サイドに表示するミニアイコンのエリア)
  ここに「一日を総括」ボタンを追加して
  IPC経由で最近のデータを取得し、表示する
*/

interface AppBarProps extends HTMLChakraProps<"div"> {
    open?: boolean;
    drawerWidth: number;
    isVisible:boolean;
}
interface CommandBarProps extends AppBarProps{
    isVisible:boolean;
    handleDrawerOpen:() => void;
}

function AppBar({ open = false, drawerWidth, children,isVisible=false }:AppBarProps){
    const theme = useTheme();

    // 動的にスタイルを決定
    const marginLeft = open ? `${drawerWidth}px` : "0";
    const transition = open
        ? `${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
        : `${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`;

    return (
        <Box
            as="header"
            bg="transparent"
            color="#000000"
            boxShadow="none"
            transition={transition}
            width={"55px"}
            minHeight="100vh"
            height="100vh"
            marginLeft={marginLeft}
            display={!open?"flex":"none"}
            justifyContent="flex-end"
        >
            { isVisible?children:<></>}
        </Box>
    );
}

export function CommandBar(props:CommandBarProps) {
    const { openDialog } = useMyDialog();

    const sideBarIconButtonStyle :IconButtonProps ={
        size:"xl",
        textStyle:"xl",
        color:"orange.900",
        bg:{
            base: "transparent",
            _hover:"blackAlpha.200"
        }
    };

    // ★一日を総括ボタン
    const handleSummarize = async () => {
      try{
        const result = await window.api.getSummary();
        // 例: アラートで表示してしまう簡易実装
        alert(
          "▼ 直近36hに投稿されたツイート\n" +
          result.tweets.map( t => `- ${t.message}`).join("\n") + "\n\n" +
          "▼ 直近36hに開始or終了されたセッション\n" +
          result.sessions.map( s => {
            let text = `[${s.task_name}]`;
            if(s.stop_time){
              text += `\n(終了メモ: ${s.note || ""})`;
            }
            return text;
          }).join("\n")
        );
        // 必要に応じて markSummarized() を呼び出し済みにしてもよい。
        // 例:
        // const tweetIds = result.tweets.map(t=>t.id);
        // const sessionIds = result.sessions.map(s=>s.id);
        // await window.api.markSummarized(tweetIds,sessionIds);
      }catch(e){
        console.error(e);
      }
    };

    return (
        <AppBar open={props.open} isVisible={props.isVisible} drawerWidth={props.drawerWidth}>
            <VStack>
                <IconButton
                    {...sideBarIconButtonStyle}
                    onClick={props.handleDrawerOpen}
                    display={props.open?'none':"block"}
                    variant={"subtle"}
                >
                    <MenuIcon />
                </IconButton>

                <Divider />

                {/*サイドバー*/}
                {/*ストップウォッチ*/}
                <IconButton {...sideBarIconButtonStyle} onClick={()=>openDialog("StopWatch")}>
                    <TimerOutlinedIcon/>
                </IconButton>

                {/*記録*/}
                <IconButton {...sideBarIconButtonStyle} onClick={()=>openDialog("AddLog")}>
                    <EditNoteIcon/>
                </IconButton>

                {/*つぶやき*/}
                <IconButton {...sideBarIconButtonStyle} onClick={()=>openDialog("Tweet")}>
                    <ChatBubbleIcon/>
                </IconButton>

                {/*タスク追加*/}
                <IconButton {...sideBarIconButtonStyle} onClick={()=>openDialog("AddTask")}>
                    <AddTaskIcon/>
                </IconButton>

                <Divider />

                {/* 一日を総括 */}
                <IconButton {...sideBarIconButtonStyle} onClick={handleSummarize}>
                    <SummarizeIcon/>
                </IconButton>
            </VStack>
        </AppBar>
    )
}
