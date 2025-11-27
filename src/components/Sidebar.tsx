"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Genghis Khan",
    url: "http://localhost:3000/quiz",
  },
  {
    title: "Figma ашиглах заавар",
    url: "#",
  },
  {
    title: "Санхүүгийн шийдвэрүүд",
    url: "#",
  },
  {
    title: "Figma-д загвар зохион бүтээх аргачлалууд",
    url: "#",
  },
  {
    title: "Санхүүгийн технологи 2023",
    url: "#",
  },
  {
    title: "Хэрэглэгчийн интерфейс дизайны шилдэг туршлага",
    url: "#",
  },
  {
    title: "Архитектур загварчлалын хөтөлбөрүүд",
    url: "#",
  },
  {
    title: "Эрүүл амьдралын хэв маяг",
    url: "#",
  },
  {
    title: "Технологийн салбарт хийгдэж буй инноваци",
    url: "#",
  },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  return (
    <Sidebar className="mt-13.5">
      <SidebarHeader className="relative">
        <SidebarTrigger className="absolute right-2 top-1" />
      </SidebarHeader>
      {sidebar?.state == "expanded" && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl font-bold">
              History
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <span className="">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
