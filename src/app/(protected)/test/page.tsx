import { CloseIcon, Star } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";

export default function QuizText() {
  const answers = [
    {
      answer: "Yesugei",
    },

    {
      answer: "Temujin",
    },

    {
      answer: "Jamukha",
    },

    {
      answer: "Toghrui",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex items-center gap-3">
        <Star />
        <h1 className="text-2xl font-bold">Article Quiz Generator</h1>
        <Button className="w-12 bg-white h-10">
          <CloseIcon />
        </Button>
      </div>
      <p className="text-gray-500">
        Take a quick test about your knowledge from your content{" "}
      </p>

      <div className="w-[558px] h-[200px] flex flex-col items-center justify-center border rounded-2xl">
        <div className="flex gap-3">
          <h1 className="font-bold">What was Genghis Khan’s birth name?</h1>
          <div className="flex">
            <span className="font-bold">1</span>
            <span className="text-gray-500">/5</span>
          </div>
        </div>
        <div className="flex flex-wrap w-[600px] justify-center h-[300px] gap-6">
          {answers.map((answer, i) => {
            return (
              <Button key={i} className="w-[250px]  font-bold">
                {answer.answer}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
