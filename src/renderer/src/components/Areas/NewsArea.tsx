import {Area, AreaBody, AreaHeader} from "../Area";
import {Speech} from "../Speech";
import {For, VStack} from "@chakra-ui/react";
import {TbMoodSadSquint} from "react-icons/tb";
import {EmptyState} from "../../ui/empty-state";

export default function NewsArea({news}:{news:{title:string,content:string}[]}) {
    return(
        <Area>
            <AreaHeader>ニュース</AreaHeader>
            {news.length > 0
                ? (
                    <VStack
                        p={4}
                        w={"full"}
                        bg={"transparent"}
                        overflowY={"auto"}
                        alignItems={"left"}
                        gap={4}
                    >
                        <For each={news}>
                            {(item, index)=>(
                                <Speech key={`Speech_${index}`}>
                                    {`【${item.title}】\n「${item.content}」`}
                                </Speech>
                            )}
                        </For>

                    </VStack>
                )
                : (
                    <AreaBody>
                        <EmptyState
                            icon={<TbMoodSadSquint/>}
                            title={"ニュースがないよ～"}
                            color={"orange.900"}
                            size={"lg"}
                        />
                    </AreaBody>
                )
            }
        </Area>
    );
}