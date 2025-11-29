"use client";

import { useEffect, useState } from "react";
import { DocumentIcon, Star } from "./icons/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";

export function Article() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  async function addArticle() {
    try {
      const res = await axios.post("http://localhost:3000/api/articles", {
        title,
        content,
        summary,
      });

      console.log("Article added:", res.data);
    } catch (error) {
      console.error("Add article error:", error);
    }
  }
  return (
    <div className="flex flex-col w-[856px] h-[442px] items-center mt-50 justify-center gap-3  border rounded-2xl">
      <div className="flex items-center gap-3">
        <Star />
        <h1 className="font-bold text-2xl pr-130">Article Quiz Generator</h1>
      </div>
      <p className="text-gray-400 w-[800px]">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>
      <div className="flex items-center gap-3">
        <DocumentIcon />
        <p className="text-gray-400 pr-172">Article Title</p>
      </div>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for your article..."
        className="w-[800px] h-10"
      />

      <div className="flex items-center gap-3">
        <DocumentIcon />
        <p className="text-gray-400 pr-165">Article Content</p>
      </div>
      <Input
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your article content here..."
        className="w-[800px] h-[120px] pb-20"
      />

      <Button className="w-[300px] bg-gray-300 ml-125" onClick={addArticle}>
        Generate summary
      </Button>
    </div>
  );
}
