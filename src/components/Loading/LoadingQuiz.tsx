"use client";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setTimeout } from "timers/promises";

export function SpinnerItem() {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((percent) => {
        if (percent >= 100) return 100;
        return percent + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full  flex-col gap-4 h-screen items-center justify-center pb-200  [--radius:1rem]">
      <Item variant="outline" className="w-[500px]">
        <ItemMedia variant="icon">
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Loading...</ItemTitle>
          <ItemDescription>{percent}/ 100% </ItemDescription>
        </ItemContent>
        <ItemActions className="hidden sm:flex">
          <Link href={"/"}>
            <Button variant="outline" size="sm">
              Go to Home
            </Button>
          </Link>
        </ItemActions>
        <ItemFooter>
          <Progress value={percent} />
        </ItemFooter>
      </Item>
    </div>
  );
}
