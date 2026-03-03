import { format } from "date-fns";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import placeholder from "@/public/gradient_1.jpg";
import type { TBlog, TUser } from "../types";

export default function BlogCard({ blog, user }: { blog: TBlog; user: TUser }) {
  const blogView = user.publicInfo?.blogView;
  return (
    <Link
      className="flex cursor-pointer flex-col rounded-lg bg-background shadow-xs ring-ring/20 hover:bg-background hover:ring dark:ring-ring/40"
      href={`/blogs/${blog.slug}`}
    >
      {blogView?.showCoverImage && (
        <AspectRatio
          className="h-full w-full rounded-t-lg bg-muted"
          ratio={16 / 9}
        >
          <img
            alt={blog.title}
            className="h-full w-full rounded-t-lg object-cover"
            height={100}
            src={blog.coverImage || placeholder.src}
            width={100}
          />
        </AspectRatio>
      )}
      <div className="flex h-full cursor-pointer flex-col gap-4 p-5 py-5">
        {blogView?.showGroup && (
          <p className="text-muted-foreground text-sm">
            {blog.group?.title || ""}
          </p>
        )}

        {blogView?.showTitle && (
          <h3 className="font-semibold text-xl">{blog.title}</h3>
        )}
        <div className="mt-auto flex flex-col gap-4">
          {blogView?.showDescription && (
            <p className="line-clamp-3 text-muted-foreground text-sm">
              {blog.description}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {blogView?.showAuthor && (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.image || placeholder.src} />
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
                <p className="font-medium text-muted-foreground text-sm">
                  {user.name}
                </p>
              </div>
            )}
            {blogView?.showDate && (
              <p className="text-muted-foreground text-sm">
                {format(blog.updatedAt, "MMM d, yyyy")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
