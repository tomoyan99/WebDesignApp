import {Area,AreaHeader,AreaBody} from "./Area";
import {TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle} from "../ui/timeline"
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuPlay,LuPause } from "react-icons/lu";
import {For, Text, VStack} from "@chakra-ui/react";
import '@fontsource/biz-udpgothic';
import DateField from "./DateField";


// 時間はDBからUNIXタイムスタンプを受け取るようにし、それをクライアント側で指定のフォーマットに変換するように。
type TimeLineEvent = {
    start :number,
    stop  :number,
    topics:{date:number,topic:string}[]
};


export default function LogArea(){
    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
            <VStack overflowY={"auto"} gap={3}>
                <For each={[
                    {
                        start:1609426800,
                        stop :1609513200,
                        topics:[
                            {date:1609426860,topic:"あいうえお"},
                            {date:1609426920,topic:"かきくけこ"},
                        ]
                    },
                    {
                        start:1609426800,
                        stop :1609513200,
                        topics:[
                            {date:1609426860,topic:"あいうえお"},
                            {date:1609426920,topic:"かきくけこ"},
                        ]
                    },
                    {
                        start:1609426800,
                        stop :1609513200,
                        topics:[
                            {date:1609426860,topic:"あいうえお"},
                            {date:1609426920,topic:"かきくけこ"},
                        ]
                    }
                ]as TimeLineEvent[]}>
                    {(item, index)=>(
                        <AreaBody
                            key={`LogArea_TimeLine_${index}`}
                            p={4}
                            h={"fit-content"}
                        >
                            <TimelineRoot  size={"lg"} maxW="400px">
                                <TimeLineStart date={item.start}/>
                                <For each={item.topics}>
                                    {(item2, index2)=>(
                                        <TimeLineTopic
                                            key={`Topic_${item.start}-${item.stop}_${index2}`}
                                            date={item2.date}
                                            topic={item2.topic}
                                        />
                                    )}
                                </For>
                                <TimeLineStop date={item.stop}/>
                            </TimelineRoot>
                        </AreaBody>
                    )}
                </For>
            </VStack>
        </Area>
    );
}

function TimeLineStart(props:{date:number}){
    return(
        <TimelineItem>
            <TimelineConnector bg="teal.solid" color="teal.contrast" fontSize={"md"}>
                <LuPlay/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle={"sm"}>タスクかいし！</TimelineTitle>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}
function TimeLineStop(props:{date:number}){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <LuPause/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle="sm">タスクしゅーりょー！</TimelineTitle>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}


function TimeLineTopic(props:{date:number,topic:string}) {
    return (
        <TimelineItem>
            <TimelineConnector bg="blue.solid" color="blue.contrast">
                <FaRegPenToSquare/>
            </TimelineConnector>
            <TimelineContent>
                <Text textStyle={"md"} fontFamily={"'BIZ UDPGothic',sans-serif"}>
                    {props.topic}
                </Text>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}