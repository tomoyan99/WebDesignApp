import {Area,AreaHeader,AreaBody} from "../Area";
import {TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle} from "../../ui/timeline"
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuPlay,LuPause } from "react-icons/lu";
import {Card, CardBodyProps, For, HStack, Text, VStack} from "@chakra-ui/react";
import convUnixToIso from "../../util/convUnixToIso";
import {Avatar} from "../../ui/avatar";
import calcElapsedTime from "../../util/calcElapsedTime";
import {AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot} from "../../ui/accordion";
import React from "react";
import {EmptyState} from "../../ui/empty-state";
import { TbMoodSadSquint } from "react-icons/tb";

// 時間はDBからUNIXタイムスタンプを受け取るようにし、それをクライアント側で指定のフォーマットに変換するように。

// Replyの情報
export type ReplyInfo = {
    avatar   :string,
    replyName:string,
    replyId  :string,
    message  :string,
    date_unix:number,
    date_iso :string,
}
export type PostInfo = {
    date_unix   :number,
    date_iso    :string,
    postMessage :string,
    reply      ?:ReplyInfo
}

export type Sessions = {
    start_unix ?:number,
    stop_unix  ?:number,
    start_iso  ?:string,
    stop_iso   ?:string,
    posts      :PostInfo[]
};


export default function SessionArea({sessions}:{sessions:Sessions[]}){
    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
            {sessions.length>0
                ? <VStack overflowY={"auto"} gap={3}>
                    <For each={sessions}>
                        {(item, index)=>(
                            <AreaBody
                                key={`LogArea_TimeLine_${index}`}
                                p={6}
                                h={"fit-content"}
                            >
                                <TimelineRoot  size={"lg"} maxW="400px">
                                    {item.start_unix && <TimeLineStart date={item.start_unix}/>}
                                    <For each={item.posts}>
                                        {(item2, index2)=>(
                                            <TimeLineTopic
                                                key={`Topic_${item.start_unix}-${item.stop_unix}_${index2}`}
                                                date={item2.date_unix}
                                                topic={item2.postMessage}
                                                reply={item2.reply}
                                            />
                                        )}
                                    </For>
                                    {(item.stop_unix && item.start_unix) && <TimeLineStop
                                        date={item.stop_unix}
                                        start={item.start_unix}
                                        stop={item.stop_unix}
                                    />}
                                </TimelineRoot>
                            </AreaBody>
                        )}
                    </For>
                </VStack>
                : <AreaBody>
                    <EmptyState
                        icon={<TbMoodSadSquint />}
                        title="履歴がないよ～"
                        size={"lg"}
                    >
                        <Text textStyle={"lg"} whiteSpace={"pre-wrap"} textAlign={"center"}>
                            {"サイドバーのストップウォッチから\nタスクを始めてね！"}
                        </Text>
                    </EmptyState>
                </AreaBody>
            }
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
                    {convUnixToIso(props.date)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}
function TimeLineStop(props:{date:number,start:number,stop:number}){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <LuPause/>
            </TimelineConnector>
            <TimelineContent pb={0}>
                <TimelineTitle textStyle="sm">タスクしゅーりょー！</TimelineTitle>
                <Text textStyle={"sm"} color={"fg.muted"}>{`経過時間：${calcElapsedTime(props.start,props.stop)}`}</Text>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.date)}
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
                <TopicCard
                    message={props.topic}
                    date={props.date}
                    textStyle={"md"}
                    rounded={"md"}
                    borderWidth={1}
                    borderColor={"gray.200"}
                />
                {props.reply?(<ReplyAccordion {...props.reply}/>):(<></>)}
            </TimelineContent>
        </TimelineItem>
    );
}

function ReplyAccordion(props:ReplyInfo){
    const [open, setOpen] = React.useState(false);

    return (
        <AccordionRoot
            collapsible
            default
            bg={{base:"white"}}
            borderWidth={1}
            borderColor={"gray.light"}
            variant={"plain"}
            rounded={"md"}
            onValueChange={()=>setOpen(!open)}
            open={open}
        >
            <AccordionItem>
                <AccordionItemTrigger
                    pl={4}
                    pr={4}
                >
                    {open
                        ? (
                            <HStack gap={4} pt={1} pb={0}>
                                <Avatar
                                    src={props.avatar}
                                    name={props.replyName}
                                    size="lg"
                                    shape="rounded"
                                    bg={"transparent"}
                                />
                                <VStack gap={0}>
                                    <Text w={"100%"} fontWeight={"semibold"} textStyle={"sm"}>{props.replyName}</Text>
                                    <Text w={"100%"} color="fg.muted" textStyle="sm">@{props.replyId}</Text>
                                </VStack>
                            </HStack>
                        )
                        : (<Text w={"100%"} pl={2}  color={"blue.500"} fontWeight={"bold"}>返信がとどいているよ!</Text>)}
                </AccordionItemTrigger>
                <AccordionItemContent pt={1} pb={1}>
                    <TopicCard
                        message={props.message}
                        date={props.date_unix}
                        pt={0}
                        pb={4}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    )
}

function TopicCard(props:CardBodyProps&{message:string,date:number}) {
    const {message,date,color,...other} = props;
    return (
        <Card.Root width="100%" borderWidth={0}>
            <Card.Body gap={3} {...other}>
                <Card.Description whiteSpace={"pre-wrap"} textStyle={props?.textStyle}>
                    {message}
                </Card.Description>
                <TimelineDescription letterSpacing={"wide"} color={"gray.400"}>
                    {convUnixToIso(props.date)}
                </TimelineDescription>
            </Card.Body>
        </Card.Root>
    );
}