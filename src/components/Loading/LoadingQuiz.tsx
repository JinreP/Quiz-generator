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

export function SpinnerItem() {
  return (
    <div className="flex w-full  flex-col gap-4 h-screen items-center justify-center pb-200  [--radius:1rem]">
      <Item variant="outline" className="w-[500px]">
        <ItemMedia variant="icon">
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Loading...</ItemTitle>
          <ItemDescription>29% / 100% </ItemDescription>
        </ItemContent>
        <ItemActions className="hidden sm:flex">
          <Link href={"/"}>
            <Button variant="outline" size="sm">
              Go to Home
            </Button>
          </Link>
        </ItemActions>
        <ItemFooter>
          <Progress value={75} />
        </ItemFooter>
      </Item>
    </div>
  );
}
