"use client";
import { Article } from "@/components/Article";
import { Employees } from "@/components/Employees";
import { CloseIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Article />
    
    </div>
  );
}
