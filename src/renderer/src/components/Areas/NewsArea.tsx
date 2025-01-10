import {Area,AreaHeader} from "../Area";
import {Speech} from "../Speech";
import {For, VStack} from "@chakra-ui/react";

export default function NewsArea(){
    return(
        <Area>
            <AreaHeader>ニュース</AreaHeader>
            <VStack
                p={4}
                w={"full"}
                bg={"transparent"}
                overflowY={"auto"}
                alignItems={"left"}
                gap={4}
            >
                <For each={[
                    "チャイティーがミルクティーの一種だったことを知らずに注文しむせた",
                ]}>
                    {(item, index)=>(
                        <Speech key={`Speech_${index}`}>
                            {`「${item}」`}
                        </Speech>
                    )}
                </For>

            </VStack>
        </Area>
    );
}