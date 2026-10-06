import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"
import { PlusIcon } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@workspace/ui/components/sheet"

const installSubRoutes = [
  {
    title: "Overview",
    description: "Overview of the installs in Mario Admin",
    link: <Link to="/installs/overview" />,
  },
  {
    title: "Manual Change",
    description: "Manual change of the installs in Mario Admin",
    link: <Link to="/installs/manual-change" />,
  },
]

export default function Navbar() {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-(--navbar-height) w-full items-center border-b bg-white/90 backdrop-blur-md">
      <div className="absolute inset-x-0 flex justify-center">
        <NavigationMenu className="flex items-center gap-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link to="/" />}>
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link to="/documentation" />}>
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Installs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-50 gap-3 p-2">
                  {installSubRoutes.map((route) => (
                    <li key={route.title}>
                      <NavigationMenuLink render={route.link}>
                        {route.title}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <NavigationMenu className="mr-4 ml-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                <PlusIcon />
                Onboard New
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Onboard New App</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input id="name" defaultValue="John Doe" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <Input id="username" defaultValue="@john-doe" />
                    </Field>
                  </FieldGroup>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose render={<Button variant="outline" />}>
                    Cancel
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
