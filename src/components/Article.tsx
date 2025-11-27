import { DocumentIcon, Star } from "./icons/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Article() {
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
        placeholder="Enter a title for your article..."
        className="w-[800px] h-10"
      />

      <div className="flex items-center gap-3">
        <DocumentIcon />
        <p className="text-gray-400 pr-165">Article Content</p>
      </div>
      <Input
        placeholder="Paste your article content here..."
        className="w-[800px] h-[120px] pb-20"
      />

      <Button className="w-[300px] bg-gray-300 ml-125">Generate summary</Button>
    </div>
  );
}
