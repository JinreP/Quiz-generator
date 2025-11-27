"use client";

import { useRouter } from "next/navigation";
import {
  BackIcon,
  Bookicon,
  DocumentIcon,
  Star,
} from "../../../components/icons/icons";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <Dialog>
        <DialogTrigger>
          <p className="font-bold pl-130">See more</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl mb-4">Genghis khan</DialogTitle>
            <DialogDescription>
              Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known
              as Chinggis Khan,[b] was the founder and first khan of the Mongol
              Empire. After spending most of his life uniting the Mongol tribes,
              he launched a series of military campaigns, conquering large parts
              of China and Central Asia. Born between 1155 and 1167 and given
              the name Temüjin, he was the eldest child of Yesugei, a Mongol
              chieftain of the Borjigin clan, and his wife Hö'elün. When Temüjin
              was eight, his father died and his family was abandoned by its
              tribe. Reduced to near-poverty, Temüjin killed his older
              half-brother to secure his familial position. His charismatic
              personality helped to attract his first followers and to form
              alliances with two prominent steppe leaders named Jamukha and
              Toghrul; they worked together to retrieve Temüjin's newlywed wife
              Börte, who had been kidnapped by raiders. As his reputation grew,
              his relationship with Jamukha deteriorated into open warfare.
              Temüjin was badly defeated in c. 1187, and may have spent the
              following years as a subject of the Jin dynasty; upon reemerging
              in 1196, he swiftly began gaining power. Toghrul came to view
              Temüjin as a threat and launched a surprise attack on him in 1203.
              Temüjin retreated, then regrouped and overpowered Toghrul; after
              defeating the Naiman tribe and executing Jamukha, he was left as
              the sole ruler on the Mongolian steppe.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button className="w-40 ml-110">Take a quiz</Button>
    </div>
  );
}
