import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { List } from "@phosphor-icons/react"

export default function NavSheet() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="ghost" className="ml-[-12px]" >
            <List size={24} weight="regular" color="#0D0A0B" className="ml-[-12px]" />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
