import List from "@mui/material/List";
import {For} from "@chakra-ui/react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {StopWatch} from "../Dialogs/StopWatch";
import {AddLog} from "../Dialogs/AddLog";
import {AddTask} from "../Dialogs/AddTask";
import {Tweet} from "../Dialogs/Tweet";
import {ListButton} from "./ListButton";

export function CommandList() {
    return (
        <List>
            <For
                each={[
                    { name: "ストップウォッチ", icon:<TimerOutlinedIcon/>,dialog:"stopwatch"},
                    { name: "記録", icon:<EditNoteIcon/>,dialog:"log"},
                    { name: "つぶやき", icon:<ChatBubbleIcon/>,dialog:"tweet"},
                    { name: "タスクを追加", icon:<AddTaskIcon/>,dialog:"task"},
                ]}
            >
                {(item) =>{
                    switch (item.dialog) {
                        case "stopwatch":
                            return (
                                <StopWatch key={"StopWatch_List"}>
                                    <ListButton name={item.name} icon={item.icon}/>
                                </StopWatch>
                            );
                        case "log":
                            return (
                                <AddLog key={"AddLog_List"}>
                                    <ListButton name={item.name} icon={item.icon}/>
                                </AddLog>
                            );
                        case "task":
                            return (
                                <AddTask key={"AddTask_List"}>
                                    <ListButton name={item.name} icon={item.icon}/>
                                </AddTask>
                            );
                        case "tweet":
                            return (
                                <Tweet key={"AddTweet_List"}>
                                    <ListButton name={item.name} icon={item.icon}/>
                                </Tweet>
                            );
                        default:
                            return (<></>);
                    }
                }}
            </For>
        </List>
    )
}