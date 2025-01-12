import List from "@mui/material/List";
import {For} from "@chakra-ui/react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {ListButton} from "./ListButton";
import {DialogType, useMyDialog} from "../../context/DialogsContext";

export function CommandList() {
    const { openDialog } = useMyDialog();
    return (
        <List>
            <For
                each={[
                    { name: "ストップウォッチ", icon:<TimerOutlinedIcon/>,dialog:"StopWatch"},
                    { name: "記録", icon:<EditNoteIcon/>,dialog:"AddLog"},
                    { name: "つぶやき", icon:<ChatBubbleIcon/>,dialog:"Tweet"},
                    { name: "タスクを追加", icon:<AddTaskIcon/>,dialog:"AddTask"},
                ]}
            >
                {(item) =>{
                    return (
                        <ListButton
                            key={`${item.dialog}_List`}
                            name={item.name}
                            icon={item.icon}
                            onClick={()=>openDialog(item.dialog as DialogType)}
                        />
                    );
                }}
            </For>
        </List>
    )
}