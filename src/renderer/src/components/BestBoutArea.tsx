import {For, List} from "@chakra-ui/react";
import {Area,AreaHeader,AreaBody} from "./Area";

export default function BestBoutArea({data}:{data:string[]}) {
    return(
        <Area h={"fit-content"}>
            <AreaHeader>Best Days</AreaHeader>
            <AreaBody padding={"5"}>
                <List.Root as={"ol"} fontSize={"2xl"}  justifyContent="space-between" gap={5}>
                    <For each={data}>
                        {(item,index)=><List.Item key={`BestBoutArea_List${index}`}>{item}</List.Item>}
                    </For>
                </List.Root>
            </AreaBody>
        </Area>
    );
}