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
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const routed = useRouter();
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

  async function confirmAndDelete() {
    if (!selectedId) return;

    try {
      const res = await axios.delete("/api/articles", {
        data: { id: selectedId },
      });

      setArticles(res.data);
      setIsDeleteDialogOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Delete failed:", error);
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
                  <SidebarMenuItem key={item.id} className="my-2 ">
                    <SidebarMenuButton asChild>
                      <ContextMenu>
                        <ContextMenuTrigger>
                          <span
                            className="text-[18px]"
                            onClick={() => routed.push(`/quiz/${item.id}`)}
                          >
                            {item.title}
                          </span>
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

                          <Dialog
                            open={isDeleteDialogOpen && selectedId === item.id}
                            onOpenChange={setIsDeleteDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <ContextMenuItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedId(item.id);
                                  setIsDeleteDialogOpen(true);
                                }}
                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                              >
                                Delete
                              </ContextMenuItem>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you sure you want to delete this article?
                                </DialogTitle>
                              </DialogHeader>

                              <Button
                                className="text-red-600 mt-4 focus:bg-red-50 bg-white border rounded-2xl focus:text-red-700"
                                onClick={confirmAndDelete}
                              >
                                Delete
                              </Button>
                            </DialogContent>
                          </Dialog>
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
