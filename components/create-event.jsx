"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
 
import { useSearchParams, useRouter } from "next/navigation";
import EventForm from "./event-form";


export default function CreateEventDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const create = searchParams.get("create");
    if(create === "true"){
        setIsOpen(true)
    }
  }, [searchParams])

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
        router.replace(window?.location?.pathname)
    }
  }

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full px-10">
          <DrawerHeader>
            Create New Event
          </DrawerHeader>
          <EventForm onSubmitForm={() => {
            handleClose();
          }}/>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
