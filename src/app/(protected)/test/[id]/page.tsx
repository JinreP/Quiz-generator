"use client";

import {
  CloseIcon,
  Correct,
  InCorrect,
  RestartIcon,
  SaveIcon,
  Star,
} from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function QuizText({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [current, setCurrent] = useState(0);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [article, setArticle] = useState("");

  useEffect(() => {
    async function loadArticle() {
      const res = await fetch("/api/articles");
      const data = await res.json();
      const found = data.find((article: any) => article.id === Number(id));
      if (found) setArticle(found.content);
    }
    loadArticle();
  }, [id]);

  useEffect(() => {
    async function createQuiz() {
      if (!article) return;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article }),
      });

      const data = await res.json();
      setQuiz(data);
    }

    createQuiz();
  }, [article]);

  if (quiz.length === 0) return <p>loading...</p>;

  const question = quiz[current];

  function pick(a: any) {
    setUserAnswers((prev) => [...prev, a]);

    if (current < quiz.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    const score = userAnswers.filter((ans) => ans.correct).length;

    return (
      <div className="p-10 flex flex-col justify-center w-full h-screen items-center gap-6">
        <div className="flex items-center gap-3">
          <Star />
          <h1 className="text-2xl font-bold">Quiz completed</h1>
        </div>

        <p className="text-gray-500">Let’s see what you did</p>

        <div className="text-2xl font-bold">
          Your score: {score} / {quiz.length}
        </div>

        <div className="border rounded-xl p-5 w-[600px] space-y-6">
          {quiz.map((questionItem, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = questionItem.answers.find(
              (a: any) => a.correct
            );

            const isCorrect = userAnswer.correct;

            return (
              <div key={index} className=" pb-3 flex pl-6 flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="mt-1">
                    {isCorrect ? <Correct /> : <InCorrect />}
                  </div>{" "}
                  <div className="flex flex-col">
                    <p className="text-gray-500">
                      {index + 1}. {questionItem.question}
                    </p>
                    <p
                      className={isCorrect ? "text-green-600" : "text-red-500"}
                    >
                      {isCorrect ? "Your answer: " : "Your answer: "}
                      {userAnswer.answer}
                    </p>
                  </div>
                </div>

                {!isCorrect && (
                  <p className="text-green-600 pl-9">
                    Correct: {correctAnswer.answer}
                  </p>
                )}
              </div>
            );
          })}
          <div className="flex justify-between px-10">
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center gap-3 w-44 bg-white border rounded-2xl h-10 text-black "
            >
              <RestartIcon />
              Restart quiz
            </Button>
            <Link href={"http://localhost:3000"}>
              <Button
                onClick={() => window.location.reload()}
                className="flex items-center gap-3 w-44 border rounded-2xl h-10"
              >
                <SaveIcon />
                Save and leave
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-2 items-center w-full h-full">
      <div className="flex  gap-90">
        <div className="flex items-center gap-3">
          <Star />
          <h1 className="text-2xl font-bold">Quick Test</h1>
        </div>
        <Link href={"http://localhost:3000"}>
          <Button className="w-12 bg-gray-300 rounded-2xl h-10">
            <CloseIcon />
          </Button>
        </Link>
      </div>

      <div className="w-[558px] h-[200px] flex flex-col items-center justify-center border rounded-2xl">
        <div className="flex gap-3 pt-3 items-center">
          <h1 className="font-bold ">{question.question}</h1>
          <div className="flex">
            <span className="font-bold">{current + 1}</span>
            <span className="text-gray-500">/{quiz.length}</span>
          </div>
        </div>

        <div className="flex flex-wrap w-[600px] justify-center h-[300px] gap-6">
          {question.answers.map((a: any, i: number) => (
            <Button
              key={i}
              className="w-[250px] mt-4 font-bold"
              onClick={() => pick(a)}
            >
              {a.answer}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
