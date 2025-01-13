import {Box, Flex, Text} from "@chakra-ui/react";
import todo from '../assets/todo.png';
import {Avatar} from "../ui/avatar";

export function Speech({children}:{children:string}) {
    return (
        <Flex
            alignItems="center"
            gap={5}
        >
            <Avatar size={"lg"} name="Todorin" src={todo} overflow={"clip"} overflowClipMargin={"content-box"} />
            <Box
                position="relative"
                bg="#f9f9f9"
                p="10px 15px"
                rounded={"lg"}
                lineHeight="1.4"
                _before={{
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "-10px",
                    transform: "translateY(-50%)",
                    width: "0",
                    height: "0",
                    borderStyle: "solid",
                    borderWidth: "10px 10px 10px 0",
                    borderColor: "transparent #f9f9f9 transparent transparent",
                }}
            >
                <Text>{children}</Text>
            </Box>
        </Flex>
    );
}
