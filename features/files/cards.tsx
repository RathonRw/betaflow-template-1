"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/lib/nuqs-params";
import type { TFile, TUser } from "../types";
import FileCard from "./card";

const PAGE_SIZE = 5;

export default function FileCards({
  files,

  user,
}: {
  files: TFile[];
  user: TUser | null;
}) {
  const [{ q, category }] = useFilters();
  if (user === undefined) {
    return (
      <section className="grid grid-cols-1 gap-4 overflow-hidden px-1 py-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <Skeleton className="h-52 w-full" key={i} />
        ))}
      </section>
    );
  }
  if (q) {
    files = files.filter((file) =>
      file.title.toLowerCase().includes(q.toLowerCase()),
    );
  }
  if (category && category !== "all") {
    files = files.filter((file) => file.group.slug === category);
  }

  if (files.length === 0 || user === null) {
    return <p>No files found</p>;
  }
  return (
    <section className="grid grid-cols-1 gap-4 overflow-hidden px-1 py-5 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file, i) => (
        <FileCard file={file} key={i} user={user} />
      ))}
      {/* <PaginationActions hasMore={hasMore} onLoadMore={onLoadMore} /> */}
    </section>
  );
}
