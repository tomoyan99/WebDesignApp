import { Button } from "../ui/button"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer"
import { useState} from "react"
import {OpenChangeDetails} from "@zag-js/dialog";

export const MyDrawer = () => {
    const [open, setOpen] = useState(false)

    return (
        <DrawerRoot open={open}
                    onOpenChange={(e:OpenChangeDetails) => setOpen(e.open)}
                    placement={"start"}
        >
            <DrawerBackdrop />
            <DrawerTrigger>
                <Button variant="outline" size="sm">
                    Open Drawer
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Drawer Title</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerActionTrigger>
                    <Button>Save</Button>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}