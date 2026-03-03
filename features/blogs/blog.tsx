"use client";
import { format } from "date-fns";
import { Share2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserInitials } from "@/lib/utils";
import placeholder from "@/public/gradient_1.jpg";
import type { TBlog, TUser } from "../types";
import EmptyBlog from "./empty-blog";

export default function UserBlog({
  user,
  blog,
}: {
  user: TUser | null;
  blog: TBlog | undefined;
}) {
  if (blog === undefined || user === null) {
    return null;
  }

  if (blog === null) {
    return (
      <EmptyBlog
        link={{ url: `/user/${user.username}/blogs`, title: "Back to Blogs" }}
      />
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.description,
        url: `/user/${user.username}/blogs/${blog.slug}`,
      });
    } else {
      await navigator.clipboard.writeText(
        `/user/${user.username}/blogs/${blog.slug}`,
      );
      toast("Link copied to clipboard.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex items-center gap-5 text-sm">
          <p>{format(blog.updatedAt, "MMMM dd, yyyy")}</p>
          {blog.group && (
            <Link
              className="text-muted-foreground hover:text-foreground"
              href={`/user/${user.username}/blogs?category=${blog.group.slug}`}
            >
              {blog.group.title}
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-balance font-medium text-5xl lg:text-6xl">
            {blog.title}
          </h3>
          {blog.description && (
            <p className="mx-auto max-w-4xl text-balance text-muted-foreground">
              {blog.description}
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.image || placeholder.src} />
              <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
            <p className="font-medium text-sm">{user.name}</p>
          </div>
          <Button onClick={handleShare} variant={"ghost"}>
            <Share2Icon />
            Share
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl px-2">
        {blog.content}
        {/* <TipTapEditor
          content={blog.content}
          editable={false}
          onChange={(content) => {
            console.log(content);
          }}
        /> */}
      </div>
    </div>
  );
}
