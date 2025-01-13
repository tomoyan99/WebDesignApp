import React, { useEffect, useState } from "react";
import {Area,AreaHeader,AreaBody} from "../Area";
import {TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle} from "../../ui/timeline"
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuPlay,LuPause } from "react-icons/lu";
import {Card, CardBodyProps, For, HStack, Text, VStack} from "@chakra-ui/react";
import {Avatar} from "../../ui/avatar";
import {EmptyState} from "../../ui/empty-state";
import { TbMoodSadSquint } from "react-icons/tb";
import convUnixToIso from "../../util/convUnixToIso";
import calcElapsedTime from "../../util/calcElapsedTime";

/*
  りれき画面: DB から get-history したデータを
  タイムライン表示するコンポーネントに修正
*/

export default function SessionArea(){
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let ignore = false;
      async function fetchData() {
        setLoading(true);
        try {
          const result = await window.api.getHistory();
          if (!ignore) {
            setHistoryData(result);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
      return () => { ignore = true; };
    }, []);

    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
            <AreaBody>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <>
                  {historyData.length>0 ? (
                    <VStack overflowY={"auto"} gap={3} p={3}>
                      <TimelineRoot size={"lg"} maxW="400px" w="full">
                        <For each={historyData}>
                          {(item, idx) => {
                            switch(item.type){
                              case "session-start":
                                return (
                                  <TimeLineStart
                                    key={`session-start-${item.id}-${idx}`}
                                    time={item.time}
                                    taskName={item.task_name}
                                  />
                                );
                              case "session-stop":
                                return (
                                  <TimeLineStop
                                    key={`session-stop-${item.id}-${idx}`}
                                    time={item.time}
                                    taskName={item.task_name}
                                    note={item.note}
                                    startTime={item.start_time}
                                  />
                                );
                              case "tweet":
                                return (
                                  <TimeLineTweet
                                    key={`tweet-${item.id}-${idx}`}
                                    time={item.time}
                                    message={item.message}
                                  />
                                );
                              default:
                                return null;
                            }
                          }}
                        </For>
                      </TimelineRoot>
                    </VStack>
                  ) : (
                    <EmptyState
                      icon={<TbMoodSadSquint />}
                      title="履歴がないよ～"
                      size={"lg"}
                    >
                      <Text textStyle={"lg"} whiteSpace={"pre-wrap"} textAlign={"center"}>
                        {"何かアクションを起こしてみよう！"}
                      </Text>
                    </EmptyState>
                  )}
                </>
              )}
            </AreaBody>
        </Area>
    );
}

function TimeLineStart(props:{time:number,taskName:string}){
    return(
        <TimelineItem>
            <TimelineConnector bg="teal.solid" color="teal.contrast" fontSize={"md"}>
                <LuPlay/>
            </TimelineConnector>
            <TimelineContent>
                <TimelineTitle textStyle={"sm"}>
                    タスク開始 <br/> [{props.taskName}]
                </TimelineTitle>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.time)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLineStop(props:{time:number,taskName:string,note?:string,startTime:number}){
    return (
        <TimelineItem>
            <TimelineConnector bg="pink.solid" color="pink.contrast" fontSize={"md"}>
                <LuPause/>
            </TimelineConnector>
            <TimelineContent >
                <TimelineTitle textStyle="sm">
                    タスク終了 <br/> [{props.taskName}]
                </TimelineTitle>
                {props.note && (
                  <Text textStyle={"sm"} color={"fg.muted"} whiteSpace="pre-wrap">
                    {`進捗メッセージ:\n${props.note}`}
                  </Text>
                )}
                <Text textStyle={"sm"} color={"fg.muted"}>
                  {`経過時間：${calcElapsedTime(Math.floor(props.startTime/1000), Math.floor(props.time/1000))}`}
                </Text>
                <TimelineDescription letterSpacing={"wide"}>
                    {convUnixToIso(props.time)}
                </TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    );
}

function TimeLineTweet(props:{time:number,message:string}){
    return (
        <TimelineItem>
            <TimelineConnector bg="blue.solid" color="blue.contrast">
                <FaRegPenToSquare/>
            </TimelineConnector>
            <TimelineContent>
                <TweetCard
                    message={props.message}
                    time={props.time}
                    textStyle={"md"}
                    rounded={"md"}
                    borderWidth={1}
                    borderColor={"gray.200"}
                />
            </TimelineContent>
        </TimelineItem>
    );
}

function TweetCard(props:CardBodyProps & {message:string,time:number}){
    const {message,time,color,...other} = props;
    return(
        <Card.Root width="100%" borderWidth={0}>
            <Card.Body gap={3} {...other}>
                <Card.Description whiteSpace={"pre-wrap"} textStyle={props?.textStyle}>
                    {message}
                </Card.Description>
                <TimelineDescription letterSpacing={"wide"} color={"gray.400"}>
                    {convUnixToIso(time)}
                </TimelineDescription>
            </Card.Body>
        </Card.Root>
    )
}
