import {Box, Heading, HTMLChakraProps} from "@chakra-ui/react";

export function Area(props:HTMLChakraProps<"div">) {
    const {children,w,h,bg,display,title,...other} = props;

    return(
        <Box
            w={w?w:"100%"} h={h?h:"100%"}
            bg={"orange.200"}
            rounded={"xl"}
            padding={"3"}
            color={"orange.950"}
            display={"grid"}
            gridTemplateRows={"fit-content(100%) 1fr"}
            {...other}
        >
            {children}
        </Box>
    );
}

export function AreaHeader({children}:{children:string}){
    return (
        <Heading size="xl" h={"fit-content"} marginBottom={"1"}>
            {children}
        </Heading>
    );
}
export function AreaBody(props:HTMLChakraProps<"div">){
    const {display,children,...other} = props;
    return (
        <Box w={"100%"} h={"100%"}
             bgColor={"orange.50"}
             rounded={"xl"}
             shadow={"md"}
             display={display?display:"grid"}
             {...other}
        >
            {children}
        </Box>
    );
}
