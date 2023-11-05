"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
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
          <Image onClick={() => router.push('/panel/dashboard')} alt='travelnik logo' className="block cursor-pointer object-cover rounded-xl object-center w-full md:w-2/3" width={1203} height={503} src='/images/travelnik-logo.png' />
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
