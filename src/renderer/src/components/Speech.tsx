import { Box, Flex, Image, Text } from "@chakra-ui/react";
import todo from '../assets/todo.png';

export function Speech({children}:{children:string}) {
    return (
        <Flex
            alignItems="center"
            gap="10px"
        >
            <Image
                src={todo}
                alt="トド"
                boxSize="80px"
            />
            <Box
                position="relative"
                bg="#f9f9f9"
                p="10px 15px"
                borderRadius="15px"
                maxWidth="600px"
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
