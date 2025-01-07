import {Box, HTMLChakraProps} from "@chakra-ui/react";

export default function Area(props:HTMLChakraProps<"div",{}>) {
    const {children,w,h,bg,...other} = props;
    return(
        <Box
            w={"100%"} h={"100%"}
            bg={"#E6B884"}
            rounded={"xl"}
            padding={"4"}
            boxShadow={"0px 4px 2px lightgray"}
            {...other}
        >
            {children}
        </Box>
    );
}

