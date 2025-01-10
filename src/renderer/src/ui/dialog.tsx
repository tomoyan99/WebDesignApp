import {
  Dialog as ChakraDialog,
  Portal,
  DialogCloseTriggerProps,
} from "@chakra-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"
import {ButtonProps} from "./button";

declare module "@chakra-ui/react" {
  export interface DialogTriggerProps{
    children?: React.ReactNode,
    asChild?:boolean,
  }
}

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  backdrop?: boolean,
  children?: React.ReactNode,
  asChild?: boolean,
}

export const DialogContent = React.forwardRef<
    HTMLDivElement,
    DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props

  const DCP:DialogContentProps={
    children,
    asChild:false
  };

  return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <ChakraDialog.Backdrop />}
        <ChakraDialog.Positioner>
          <ChakraDialog.Content ref={ref} {...DCP} {...rest} />
        </ChakraDialog.Positioner>
      </Portal>
  )
})


export const DialogCloseTrigger = React.forwardRef<
    HTMLButtonElement,
    ChakraDialog.CloseTriggerProps & ButtonProps
>(function DialogCloseTrigger(props, ref) {
  const {size,...other}=props;
  const DCTP :DialogCloseTriggerProps = {
    position:"absolute",
    top:"2",
    insetEnd:"2",
    asChild:true,
    children:(
        <CloseButton size={size ?? "md"} ref={ref}>
          {props.children}
        </CloseButton>
    )
  }
  return (<ChakraDialog.CloseTrigger {...DCTP} {...other}/>);
})

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop
export const DialogTitle = ChakraDialog.Title
export const DialogDescription = ChakraDialog.Description
export const DialogTrigger = ChakraDialog.Trigger
export const DialogActionTrigger = ChakraDialog.ActionTrigger
