import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { routes } from "./routes";

export default function Sidebar() {

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="text-white">
          Travelnik
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {routes.map((item, index) => (
          <NavbarMenuItem key={`${index}`} className="cursor-pointer">
            <Link className="text-white" onClick={() => router.push(item.route)}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
      <NavbarMenu>
        {routes.map((item, index) => (
          <NavbarMenuItem key={`${index}`}>
            <Link className="text-white" onClick={() => router.push(item.route)}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
