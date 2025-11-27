"use client";

import { useRouter } from "next/navigation";
import {
  BackIcon,
  Bookicon,
  DocumentIcon,
  Star,
} from "../../../components/icons/icons";
import { Button } from "../../../components/ui/button";

export default function Quiz() {
  const router = useRouter();
  const handleRouter = (e: any) => {
    e.preventDefault();
    router.push("http://localhost:3000");
  };
  return (
    <div className="w-[700px] h-[540px] rounded-2xl flex flex-col items-start gap-1 px-13 justify-center border">
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

      <h1 className="text-2xl font-bold">Genghis khan</h1>

      <p className="">
        Genghis Khan, born Temüjin around 1162, was the founder of the Mongol
        Empire. After his father's death, Temüjin's family was left in poverty,
        and he later killed his half-brother to secure his position. He built
        alliances with leaders like Jamukha and Toghrul, and despite being
        defeated in battle and briefly under the Jin dynasty, he rose to power
        by defeating rivals. By 1206, after overcoming the Naiman tribe and
        executing Jamukha, Temüjin became the undisputed ruler of the Mongol
        steppe, eventually leading a series of successful military campaigns
        that expanded his empire across China and Central Asia.
      </p>

      <div className="flex items-center gap-3">
        <DocumentIcon />
        <p className="text-gray-400 ">Article Content</p>
      </div>

      <p>
        Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known as
        Chinggis Khan,[b] was the founder and first khan of the Mongol Empire.
        After spending most of his life uniting the Mongol tribes, he launched a
        series of military campaigns, conquering large parts of China and
        Central Asia.
      </p>
      <p className="font-bold pl-130">See more</p>
      <Button className="w-40 ml-110">Take a quiz</Button>
    </div>
  );
}
