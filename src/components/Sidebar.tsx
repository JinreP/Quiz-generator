"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function AppSidebar() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function Load() {
      const res = await axios.get("http://localhost:3000/api/articles");
      setArticles(res.data);
    }
    Load();
  }, []);

  async function edit() {
    if (!selectedId || !editedTitle.trim()) return;

    try {
      const res = await axios.patch("/api/articles", {
        id: selectedId,
        title: editedTitle,
      });

      setArticles(res.data);
      setIsDialogOpen(false);
      setSelectedId(null);
      setEditedTitle("");
    } catch (error) {
      console.error("Edit failed:", error);
    }
  }

  const sidebar = useSidebar();

  return (
    <Sidebar className="mt-13.5">
      <SidebarTrigger className="absolute right-2 top-1" />

      {sidebar?.state === "expanded" && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl font-bold">
              History
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {articles.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <ContextMenu>
                        <ContextMenuTrigger>
                          <span>{item.title}</span>
                        </ContextMenuTrigger>

                        <ContextMenuContent>
                          <Dialog
                            open={isDialogOpen && selectedId === item.id}
                            onOpenChange={setIsDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <ContextMenuItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedId(item.id);
                                  setEditedTitle(item.title);
                                  setIsDialogOpen(true);
                                }}
                              >
                                Edit
                              </ContextMenuItem>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit your article</DialogTitle>
                              </DialogHeader>

                              <Input
                                placeholder="Type your edited title"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                              />

                              <Button className="mt-4" onClick={edit}>
                                Save
                              </Button>
                            </DialogContent>
                          </Dialog>

                          <ContextMenuItem>Delete</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
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
