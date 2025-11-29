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
import { useEffect, useState } from "react";
import axios from "axios";

export function AppSidebar() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function Load() {
      const res = await axios.get("http://localhost:3000/api/articles");
      setArticles(res.data);
    }
    Load();
  }, []);
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
                {articles.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={`http://localhost:3000/quiz/${item.id}`}>
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
