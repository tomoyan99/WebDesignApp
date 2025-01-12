import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Text} from "@chakra-ui/react";

export function ListButton(props:{name:string,icon:React.ReactElement}) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Text fontSize={"1.1em"}>{props.name}</Text>}
                />
            </ListItemButton>
        </ListItem>
    );
}