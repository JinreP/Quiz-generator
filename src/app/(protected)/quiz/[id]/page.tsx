"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  BackIcon,
  Bookicon,
  DocumentIcon,
  Star,
} from "@/components/icons/icons";
import { use, useEffect, useState } from "react";
import axios from "axios";

export default function Quiz({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function QuizId() {
      const res = await axios.get("http://localhost:3000/api/articles");
      const found = res.data.find((article: any) => article.id === Number(id));
      setArticle(found);
    }
    QuizId();
  }, [id]);

  if (!article) return <p>not found</p>;

  const handleRouter = (e: any) => {
    e.preventDefault();
    router.push("http://localhost:3000");
  };
  return (
    <div className="w-[700px] h-[500px]  rounded-2xl flex flex-col items-start gap-4 px-13 justify-center border">
      <Button className="bg-white w-[50px] border mr-10" onClick={handleRouter}>
        <BackIcon />
      </Button>
      <div className="flex items-center gap-3">
        <Star />
        <h1 className="text-2xl font-bold">Article Quiz Generator</h1>
      </div>

      <div className="flex items-center gap-3">
        <Bookicon />
        <h1 className="text-gray-500 font-bold">Summarized content</h1>
      </div>

      <h1 className="text-2xl font-bold">{article.title}</h1>

      <p className="">{article.summary}</p>

      <div className="flex items-center gap-3">
        <DocumentIcon />
        <p className="text-gray-400 ">Article Content</p>
      </div>

      <p className="h-[50px] overflow-hidden">{article.content}</p>
      <Dialog>
        <DialogTrigger>
          <p className="font-bold pl-130">See more</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl mb-4">
              {article.title}
            </DialogTitle>
            <DialogDescription>
            {article.summary}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button className="w-40 ml-110">Take a quiz</Button>
    </div>
  );
}
