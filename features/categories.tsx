"use client";
import {
  CheckIcon,
  ChevronDownIcon,
  LoaderIcon,
  RssIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { debounce } from "nuqs";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFilters } from "@/lib/nuqs-params";
import { cn } from "@/lib/utils";

export function BlogsCategories({
  categories,
}: {
  categories: { title: string; slug: string }[];
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [{ category, q }, setSearchParams] = useFilters({
    startTransition,
  });
  return (
    <div className="flex flex-wrap items-center">
      <div className="hidden items-center gap-2 md:flex">
        {categories.map((c) => (
          <Button
            className="rounded-full font-normal"
            key={c.slug}
            onClick={() => setSearchParams({ category: c.slug })}
            variant={c.slug === category ? "default" : "secondary"}
          >
            {c.title}
          </Button>
        ))}
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn(
              "rounded-full font-normal capitalize md:hidden",
              showSearch && "hidden",
            )}
          >
            {categories.find((c) => c.slug === category)?.title}
            <ChevronDownIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>List of Categories</DrawerTitle>
            <DrawerDescription>
              Click on a category to filter posts.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex w-full flex-col gap-4 p-4">
            {categories.map((c) => (
              <button
                className="flex items-center justify-between text-left font-normal"
                key={c.slug}
                onClick={() => setSearchParams({ category: c.slug })}
                type="button"
              >
                <span>{c.title}</span>
                {c.slug === category && <CheckIcon className="size-4" />}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
      <div className="ml-auto flex items-center gap-2">
        <InputGroup
          className={cn(
            "hidden rounded-full shadow-none md:flex",
            showSearch && "flex",
          )}
        >
          <InputGroupInput
            onChange={(e) => {
              startTransition(async () => {
                await setSearchParams(
                  { q: e.target.value },
                  {
                    limitUrlUpdates: e.target.value.length
                      ? debounce(500)
                      : undefined,
                  },
                );
              });
            }}
            placeholder="Search posts..."
            value={q || ""}
          />
          <InputGroupAddon>
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <SearchIcon />
            )}
          </InputGroupAddon>
          {showSearch && (
            <InputGroupAddon
              align="inline-end"
              onClick={() => setShowSearch(false)}
            >
              <XIcon />
            </InputGroupAddon>
          )}
        </InputGroup>
        <Button
          className={cn(
            "rounded-full text-muted-foreground md:hidden",
            showSearch && "hidden",
          )}
          onClick={() => setShowSearch(true)}
          size="icon"
          variant={"outline"}
        >
          <SearchIcon />
        </Button>
        <Button
          className="rounded-full text-muted-foreground"
          size="icon"
          variant={"outline"}
        >
          <RssIcon />
        </Button>
      </div>
    </div>
  );
}
