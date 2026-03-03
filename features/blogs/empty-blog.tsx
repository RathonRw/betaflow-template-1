import { PenToolIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyBlog({
  link,
}: {
  link: { url: string; title: string };
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PenToolIcon />
        </EmptyMedia>
        <EmptyTitle>No Blog Found </EmptyTitle>
        <EmptyDescription>
          No blogs found for the selected content
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant={"link"}>
          <Link href={link.url as Route}>{link.title}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
