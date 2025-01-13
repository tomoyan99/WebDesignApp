import {Area, AreaBody, AreaHeader} from "../Area";
import {
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineRoot,
    TimelineTitle
} from "../../ui/timeline"
import {FaRegPenToSquare} from "react-icons/fa6";
import {LuPause, LuPlay} from "react-icons/lu";
import {Card, CardBodyProps, For, HStack, Text, VStack} from "@chakra-ui/react";
import convUnixToIso from "../../util/convUnixToIso";
import {Avatar} from "../../ui/avatar";
import calcElapsedTime from "../../util/calcElapsedTime";
import {AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot} from "../../ui/accordion";
import React from "react";
import {EmptyState} from "../../ui/empty-state";
import {TbMoodSadSquint} from "react-icons/tb";
import todo from "../../assets/todo.png"
import {
    MyReplyInfo,
    MySessionItemEnd,
    MySessionItemPost,
    MySessionItemStart,
    MySessions
} from "../../context/SessionContext";

// 時間はDBからUNIXタイムスタンプを受け取るようにし、それをクライアント側で指定のフォーマットに変換するように。

export default function SessionArea({sessions}:{sessions:MySessions}){
    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
            {sessions.length>0
                ? <VStack overflowY={"auto"} gap={3}>
                    <For each={sessions}>
                        {(session, index)=>(
                            <AreaBody
                                key={`LogArea_TimeLine_${index}`}
                                p={6}
                                pb={0}
                                h={"fit-content"}
                            >
                                <TimelineRoot  size={"lg"} maxW="400px">
                                    <For each={session}>
                                        {(sessionItem,index)=>(
                                            <>
                                                {sessionItem.type === "start" &&
                                                    <TimeLineStart
                                                        key={`Start_${index}`}
                                                        {...sessionItem}
                                                    />}
                                                {sessionItem.type === "post" &&
                                                    <TimeLinePost
                                                        key={`Topic_${index}`}
                                                        {...sessionItem}
                                                    />
                                                }
                                                {sessionItem.type === "end" &&
                                                    <TimeLineEnd
                                                        key={`End_${index}`}
                                                        {...sessionItem}
                                                    />}
                                            </>
                                        )}
                                    </For>
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

function TimeLineStart(props:MySessionItemStart){
    return(
        <TimelineItem>
            <TimelineConnector bg="teal.solid" color="teal.contrast" fontSize={"md"}>
                <LuPlay/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle={"sm"}>
                    {props.task && `[${props.task}]`}
                    {props.task && <br/>}
                    タスクかいし！
                </TimelineTitle>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.date_unix)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLineEnd(props:MySessionItemEnd){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <LuPause/>
            </TimelineConnector>
            <TimelineContent >
                <TimelineTitle textStyle="sm">
                    {props.task && `[${props.task}]`}
                    {props.task && <br/>}
                    タスクしゅーりょー！
                </TimelineTitle>
                <Text textStyle={"sm"} color={"fg.muted"}>{`経過時間：${calcElapsedTime(props.elapsed)}`}</Text>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.date_unix)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLinePost(props:MySessionItemPost) {
    return (
        <TimelineItem>
            <TimelineConnector bg="blue.solid" color="blue.contrast">
                <FaRegPenToSquare/>
            </TimelineConnector>
            <TimelineContent>
                <TopicCard
                    message={props.message}
                    date={props.date_unix}
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

function ReplyAccordion(props:MyReplyInfo){
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
                                    src={todo}
                                    name={"トドりん"}
                                    size="lg"
                                    shape="rounded"
                                    bg={"transparent"}
                                />
                                <VStack gap={0}>
                                    <Text w={"100%"} fontWeight={"semibold"} textStyle={"sm"}>
                                        トドりん
                                    </Text>
                                    <Text w={"100%"} color="fg.muted" textStyle="sm">
                                        @todorin0909
                                    </Text>
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