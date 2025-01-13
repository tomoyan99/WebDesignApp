// src/renderer/src/components/Areas/SessionArea.tsx

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
import {LuPlay} from "react-icons/lu";
import {Card, CardBodyProps, For, HStack, Text, VStack} from "@chakra-ui/react";
import convUnixToIso from "../../util/convUnixToIso";
import {Avatar} from "../../ui/avatar";
import calcElapsedTime from "../../util/calcElapsedTime";
import {AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot} from "../../ui/accordion";
import React,{Fragment} from "react";
import {EmptyState} from "../../ui/empty-state";
import {TbMoodSadSquint} from "react-icons/tb";
import todo from "../../assets/todo.png"
import {
    MyReplyInfo,
    MySessionItemEnd,
    MySessionItemPost,
    MySessionItemStart,
    useSessionContext
} from "../../context/SessionContext";
import { FaCheck } from "react-icons/fa";


// ★ 追加
import { useLogContext } from "../../context/LogContext";

export default function SessionArea(){
    const { sessionData } = useSessionContext();

    // ★ 追加: LogContextから、reply, result を受け取って
    // 「トドリンからのリプライ」「トドリンからのまとめ」も最後に表示する例
    const { reply, result } = useLogContext();

    // sessionData は 2次元配列(セッションごと？)になっているようなので、
    // ここで reply[], result[] をまとめて一番下に表示する実装例を入れます。
    // 例: sessionData の最後に reply[] と result[] を「post」として強引に付け足すサンプル
    // もちろんビジネスロジックに合わせて調整してください。
    const combinedSessionData = React.useMemo(() => {
      // sessionData は array of array
      // 末尾に「トドリン」系を置くために、最終行だけ reply / result を付ける例
      if (sessionData.length === 0) return [];

      // deep copy
      const newData = sessionData.map(items => [...items]);

      // たとえば最終セッションの末尾にまとめて「post」項目として格納
      // ここでは簡易サンプルとして reply[] と result[] を並べています
      const last = newData[newData.length - 1];

      // reply[] => MySessionItemPost として追加
      reply.forEach((r) => {
        last.push({
          type: "post",
          message: `[トドリン・リプライ] ${r.content}`,
          date_unix: Date.now(), // 今
          reply: undefined, // 仮: nested reply は不要
        } as MySessionItemPost);
      });

      // result[] => MySessionItemPost として追加
      result.forEach((res) => {
        last.push({
          type: "post",
          message: `[トドリン・まとめ] ${res}`,
          date_unix: Date.now(),
          reply: undefined,
        } as MySessionItemPost);
      });

      return newData;
    }, [sessionData, reply, result]);

    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
<<<<<<< HEAD
            {combinedSessionData.length>0
                ? (
                  <VStack overflowY={"auto"} gap={3}>
                    <For each={combinedSessionData}>
                      {(session, sessionIndex)=>(
                        <AreaBody
                          key={`LogArea_TimeLine_${sessionIndex}`}
                          p={6}
                          pb={0}
                          h={"fit-content"}
                        >
                          <TimelineRoot size={"lg"} maxW="400px">
                            <For each={session} key={`For_${sessionIndex}`}>
                              {(sessionItem,sessionItemIndex)=>(
                                <Box key={`Box_SessionItem_${sessionItemIndex}`}>
                                  {sessionItem.type === "start" &&
                                    <TimeLineStart
                                      key={`Start_${sessionItemIndex}`}
                                      {...sessionItem}
                                    />}
                                  {sessionItem.type === "post" &&
                                    <TimeLinePost
                                      key={`Topic_${sessionItemIndex}`}
                                      {...sessionItem}
                                    />
                                  }
                                  {sessionItem.type === "end" &&
                                    <TimeLineEnd
                                      key={`End_${sessionItemIndex}`}
                                      {...sessionItem}
                                    />}
                                </Box>
                              )}
                            </For>
                          </TimelineRoot>
                        </AreaBody>
                      )}
=======
            {sessionData.length>0
                ? <VStack overflowY={"auto"} gap={3}>
                    <For each={sessionData}>
                        {(session, sessionIndex)=>(
                            <AreaBody
                                key={`LogArea_TimeLine_${sessionIndex}`}
                                p={6}
                                pb={0}
                                h={"fit-content"}
                            >
                                <TimelineRoot size={"lg"} maxW="400px">
                                    <For each={session} key={`For_${sessionIndex}`}>
                                        {(sessionItem,sessionItemIndex)=>(
                                            <Fragment key={`fragment_${sessionItemIndex}`}>
                                                {sessionItem.type === "start" &&
                                                    <TimeLineStart
                                                        key={`Start_${sessionItemIndex}`}
                                                        {...sessionItem}
                                                    />}
                                                {sessionItem.type === "post" &&
                                                    <TimeLinePost
                                                        key={`Topic_${sessionItemIndex}`}
                                                        {...sessionItem}
                                                    />
                                                }
                                                {sessionItem.type === "end" &&
                                                    <TimeLineEnd
                                                        key={`End_${sessionItemIndex}`}
                                                        {...sessionItem}
                                                    />}
                                            </Fragment>
                                        )}
                                    </For>
                                </TimelineRoot>
                            </AreaBody>
                        )}
>>>>>>> e76705db2341f0dc1fed76ccd4bf36ba1ab51764
                    </For>
                  </VStack>
                )
                : (
                  <AreaBody>
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
                )
            }
        </Area>
    );
}

function TimeLineStart(props: MySessionItemStart){
    return(
        <TimelineItem>
            <TimelineConnector bg="teal.solid" color="teal.contrast" fontSize={"md"}>
                <LuPlay/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle={"sm"}>
                    {props.task && `[${props.task}]`}
                    {props.task && <br/>}
                    {props.message}
                </TimelineTitle>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.date_unix)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLineEnd(props: MySessionItemEnd){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <FaCheck/>
            </TimelineConnector>
            <TimelineContent >
                <TimelineTitle textStyle="sm">
                    {props.task && `[${props.task}]`}
                    {props.task && <br/>}
                    {props.message}
                    <br/>
                </TimelineTitle>
<<<<<<< HEAD
                {/* props.elapsed は number として受け取る設計例 */}
                <Text textStyle={"sm"} color={"fg.muted"}>{`経過時間：${calcElapsedTime(props.elapsed)}`}</Text>
=======
                <Text textStyle={"sm"}>{`経過時間：${calcElapsedTime(props.elapsed)}`}</Text>
>>>>>>> e76705db2341f0dc1fed76ccd4bf36ba1ab51764
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.date_unix)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLinePost(props: MySessionItemPost) {
    return (
        <TimelineItem>
            <TimelineConnector bg="blue.solid" color="blue.contrast">
                <FaRegPenToSquare/>
            </TimelineConnector>
            <TimelineContent>
                <PostCard
                    message={props.message}
                    date={props.date_unix}
                    textStyle={"md"}
                    rounded={"md"}
                    borderWidth={1}
                    borderColor={"gray.200"}
                />
                {props.reply && <ReplyAccordion {...props.reply}/>}
            </TimelineContent>
        </TimelineItem>
    );
}

function ReplyAccordion(props: MyReplyInfo){
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
                <AccordionItemTrigger pl={4} pr={4}>
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
                        : (
                          <Text w={"100%"} pl={2}  color={"blue.500"} fontWeight={"bold"}>
                            返信がとどいているよ!
                          </Text>
                        )
                    }
                </AccordionItemTrigger>
                <AccordionItemContent pt={1} pb={1}>
                    <PostCard
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

<<<<<<< HEAD
function TopicCard(props: CardBodyProps & { message: string; date: number }) {
    const { message, date, color, ...other } = props;
=======
function PostCard(props:CardBodyProps&{message:string,date:number}) {
    const {message,date,color,...other} = props;
>>>>>>> e76705db2341f0dc1fed76ccd4bf36ba1ab51764
    return (
        <Card.Root width="100%" borderWidth={0}>
            <Card.Body gap={3} {...other}>
                <Card.Description whiteSpace={"pre-wrap"} textStyle={props?.textStyle}>
                    {message}
                </Card.Description>
                <TimelineDescription letterSpacing={"wide"} color={"gray.400"}>
                    {convUnixToIso(date)}
                </TimelineDescription>
            </Card.Body>
        </Card.Root>
    );
}
