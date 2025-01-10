import {
    DialogBody, DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {
    DialogBodyProps,
    DialogContentProps, DialogFooterProps,
    DialogHeaderProps,
    DialogRootProps,
    HTMLChakraProps,
} from "@chakra-ui/react";
import React from "react";

namespace MyDialog {

    export function Root(props:DialogRootProps) {
        const {children,...other} = props;

        return(
            <DialogRoot {...other}>
                {children}
            </DialogRoot>
        );
    }

    export function Trigger({children}:{children:React.ReactNode}) {
        return (
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
        )
    }

    export function Content(props:DialogContentProps&HTMLChakraProps<"div">) {
        const {children, ...other} = props;
        return(
            <DialogContent {...other}>
                {children}
                <DialogCloseTrigger
                    size={"xl"}
                    _hover={{
                        bg:"blackAlpha.200"
                    }}
                />
            </DialogContent>
        )
    }

    export function Header(props:DialogHeaderProps&HTMLChakraProps<"div">) {
        const {children, ...other} = props;
        return(
            <DialogHeader>
                <DialogTitle {...other}>{children}</DialogTitle>
            </DialogHeader>
        )
    }
    export function Body(props:DialogBodyProps&HTMLChakraProps<"div">) {
        const {children, ...other} = props;
        return(
            <DialogBody {...other}>
                {children}
            </DialogBody>
        );
    }

    export function Footer(props:DialogFooterProps&HTMLChakraProps<"div">) {
        const {children, ...other} = props;
        return(
            <DialogFooter {...other}>
                {children}
            </DialogFooter>
        );
    }
}

export default MyDialog;