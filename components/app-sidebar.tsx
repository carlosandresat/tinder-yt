"use client";

import { Home, Settings, CircleUserRound, LockKeyhole } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoutButton } from "@/components/logout-button";

const items = [
  {
    title: "Inicio",
    url: "/home",
    icon: Home,
  },
  {
    title: "Perfil",
    url: "/home/profile",
    icon: CircleUserRound,
  },
  {
    title: "Lista de Bloqueados",
    url: "/home/blocklist",
    icon: LockKeyhole,
  },
  {
    title: "Configuración",
    url: "/home/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/home" onClick={() => setOpenMobile(false)}>
                <Image
                  className="size-8 rounded-full"
                  src="/logo.webp"
                  alt="Logo"
                  width={80}
                  height={80}
                />
                <span className="ml-2 font-semibold">TinderYT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-[6px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:!p-0 hover:bg-transparent active:bg-transparent"
            >
              <div className="flex gap-2 items-center px-0">
                <ModeToggle />
                <span>¡Cambia de modo!</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:!p-0 hover:bg-transparent active:bg-transparent"
            >
              <div className="flex gap-2 items-center px-0">
                <LogoutButton />
                <span>Cerrar Sesión</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
