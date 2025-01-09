import {Area,AreaHeader,AreaBody} from "./Area";
import {TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle} from "../ui/timeline"
import {LuCheck, LuPackage, LuShip} from "react-icons/lu";
import {For, Text, VStack} from "@chakra-ui/react";

export default function LogArea(){
    return(
        <Area>
            <AreaHeader>りれき</AreaHeader>
            <VStack overflowY={"auto"} gap={3}>
                <For each={[1,2,3,4]}>
                    {(_item, index)=>(
                        <AreaBody
                            key={`LogArea_TimeLine_${index}`}
                            p={4}
                            h={"fit-content"}
                        >
                            <TimelineRoot size={"md"} maxW="400px">
                                <TimelineItem>
                                    <TimelineConnector>
                                        <LuShip />
                                    </TimelineConnector>
                                    <TimelineContent>
                                        <TimelineTitle textStyle={"md"} fontWeight={"bold"}>Product Shipped</TimelineTitle>
                                        <TimelineDescription>13th May 2021</TimelineDescription>
                                        <Text>
                                            We shipped your product via <strong>FedEx</strong> and it should
                                            arrive within 3-5 business days.
                                        </Text>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineConnector>
                                        <LuCheck />
                                    </TimelineConnector>
                                    <TimelineContent>
                                        <TimelineTitle textStyle="sm">Order Confirmed</TimelineTitle>
                                        <TimelineDescription>18th May 2021</TimelineDescription>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineConnector>
                                        <LuPackage />
                                    </TimelineConnector>
                                    <TimelineContent>
                                        <TimelineTitle >Order Delivered</TimelineTitle>
                                        <TimelineDescription>20th May 2021, 10:30am</TimelineDescription>
                                    </TimelineContent>
                                </TimelineItem>
                            </TimelineRoot>
                        </AreaBody>
                    )}
                </For>
            </VStack>

        </Area>
    );
}