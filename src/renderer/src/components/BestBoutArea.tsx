import {For, List} from "@chakra-ui/react";
import {Area,AreaHeader,AreaBody} from "./Area";

export default function BestBoutArea({data}:{data:string[]}) {
    return(
        <Area h={"60%"}>
            <AreaHeader>Best Days</AreaHeader>
            <AreaBody padding={"5"} overflowY={"auto"}>
                <List.Root as={"ol"} fontSize={"2xl"} >
                    <For each={data}>
                        {(item)=><List.Item>{item}</List.Item>}
                    </For>
                </List.Root>
            </AreaBody>
        </Area>
    );
}