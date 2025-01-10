import {Area,AreaHeader,AreaBody} from "./Area";
import {TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle} from "../ui/timeline"
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuPlay,LuPause } from "react-icons/lu";
import {Card, For, HStack, Text, VStack} from "@chakra-ui/react";
// import '@fontsource/biz-udpgothic';
import DateField from "./DateField";
import {Avatar} from "../ui/avatar";
import todo from "../assets/todo.png";
import ElapsedTime from "./ElapsedTime";

// 時間はDBからUNIXタイムスタンプを受け取るようにし、それをクライアント側で指定のフォーマットに変換するように。

// Replyの情報
type ReplyInfo = {
    avatar:string,
    name: string,
    id: number,
    message: string,
    date:number,
}

type TimeLineEvent = {
    start :number,
    stop  :number,
    topics:{date:number,topic:string,reply?:ReplyInfo}[]
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
                            {
                                date:1609426860,
                                topic:"あいうえおあいうえお\nあいうえおあいうえおあいうえお",
                                reply:{
                                    date:132443535,
                                    name:"トドりん",
                                    id:"todorin1122",
                                    avatar:todo,
                                    message:
                                        "これはクライアントには出せないかなぁ。\n" +
                                        "帰属意識は大事だけど視野狭窄になってない？\n" +
                                        "昇格はちょっと厳しくなったかもね。\n"
                                }},
                            {date:1609426920,topic:"かきくけこ"},
                        ],
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
                                            reply={item2.reply}
                                        />
                                    )}
                                </For>
                                <TimeLineStop date={item.stop} elapsed={item.stop - item.start}/>
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
function TimeLineStop(props:{date:number,elapsed:number}){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <LuPause/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle="sm">タスクしゅーりょー！</TimelineTitle>
                <Text textStyle={"sm"} color={"fg.muted"}>経過時間：<ElapsedTime timestamp={props.elapsed}/></Text>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLineTopic(props:{date:number,topic:string,reply?:ReplyInfo}) {
    return (
        <TimelineItem>
            <TimelineConnector bg="blue.solid" color="blue.contrast">
                <FaRegPenToSquare/>
            </TimelineConnector>
            <TimelineContent>
                <Text
                    textStyle={"lg"}
                    // fontFamily={"'BIZ UDPGothic',sans-serif"}
                    whiteSpace={"pre-wrap"}
                >
                    {props.topic}
                </Text>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
                    {props.reply?(<ReplyCard {...props.reply}/>):(<></>)}
            </TimelineContent>
        </TimelineItem>
    );
}

function ReplyCard(props:ReplyInfo) {
    return (
        <Card.Root width="100%">
            <Card.Body gap={2}>
                <HStack gap={4}>
                    <Avatar
                        src={props.avatar}
                        name={props.name}
                        size="lg"
                        shape="rounded"
                        bg={"transparent"}
                    />
                    <VStack gap={0}>
                        <Text w={"100%"} fontWeight={"semibold"} textStyle={"sm"}>{props.name}</Text>
                        <Text w={"100%"} color="fg.muted" textStyle="sm">@{props.id}</Text>
                    </VStack>
                </HStack>
                <Card.Description whiteSpace={"pre-wrap"}>
                    {props.message}
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <TimelineDescription letterSpacing={"wide"}>
                    <DateField value={props.date}/>
                </TimelineDescription>
            </Card.Footer>
        </Card.Root>
    );
}