import {Box, Heading, HTMLChakraProps} from "@chakra-ui/react";

export default function Area(props:HTMLChakraProps<"div",{}>&{title:string}) {
    const {children,w,h,bg,title,...other} = props;
    return(
        <Box
            w={"100%"} h={"100%"}
            bg={"orange.200"}
            rounded={"xl"}
            padding={"3"}
            color={"orange.950"}
            display={"grid"}
            gridTemplateRows={"fit-content(100%) 1fr"}
            {...other}
        >
            <Heading h={"fit-content"} marginBottom={"1"}>{title}</Heading>
            <Box w={"100%"} h={"100%"}
                 bgColor={"orange.50"}
                 rounded={"xl"}
                 shadow={"md"}
                 // boxShadow={"0px 3px 4px lightgray"}
            >
                {children}
            </Box>
        </Box>
    );
}

