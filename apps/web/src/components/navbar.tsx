import { Link } from "@tanstack/react-router"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"

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
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
