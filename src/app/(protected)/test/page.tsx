"use client";

import { CloseIcon, Star } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";

export default function QuizText() {
  const [current, setCurrent] = useState(1);
  const [quiz, setQuiz] = useState(2);
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  function handleAnswer(selected: { answer: string; correct: boolean }) {
    setQuizAnswers((prev) => [...prev, selected]);

    if (current < quiz) {
      setCurrent(current + 1);
    }

    if (selected.correct) {
      console.log(" correct answer");
    } else {
      console.log("wrong answer");
    }
  }

  console.log(quizAnswers);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex items-center gap-3">
        <Star />
        <h1 className="text-2xl font-bold">Quick Test</h1>
        <Button className="w-12 bg-white h-10">
          <CloseIcon />
        </Button>
      </div>
      <p className="text-gray-500">
        Take a quick test about your knowledge from your content
      </p>

      <div className="w-[558px] h-[200px] flex flex-col items-center justify-center border rounded-2xl">
        <div className="flex gap-3 pt-3 items-center">
          <h1 className="font-bold ">What was Genghis Khan’s birth name?</h1>
          <div className="flex">
            <span className="font-bold">{current}</span>
            <span className="text-gray-500">/{quiz}</span>
          </div>
        </div>
        <div className="flex flex-wrap w-[600px] justify-center h-[300px] gap-6">
          {answers.map((answer, i) => {
            return (
              <Button
                key={i}
                className="w-[250px] mt-4 font-bold"
                onClick={() => handleAnswer(answer)}
                disabled={current >= quiz}
              >
                {answer.answer}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
