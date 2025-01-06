import {Heading, StackSeparator, VStack} from "@chakra-ui/react";

export default function SideBar(){
    return (
        <>
            <VStack separator={<StackSeparator />}>
                <Heading >ホーム</Heading>
            </VStack>
        </>
    );
};