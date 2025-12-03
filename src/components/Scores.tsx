"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useEffect, useState } from "react";

export function Scores() {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    async function scores() {
      const res = await axios.get("/api/score");
      setScores(res.data);
    }
    scores();
  }, []);
  return (
    <div className="">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Scores</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-bold">You're scores</DropdownMenuLabel>
            {scores.map((score, i) => {
              return (
                <div key={i}>
                  <DropdownMenuItem>
                    <h1>{score.article.title}</h1>
                    <div className="flex items-center">
                      <p className="font-bold">{score.score}</p>
                      <p className="text-gray-500">/ 5</p>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuItem>
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
