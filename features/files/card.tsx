import { format } from "date-fns";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatSize, getUserInitials } from "@/lib/utils";
import placeholder from "@/public/gradient_1.jpg";
import type { TFile, TUser } from "../types";

export default function FileCard({
  file,

  user,
}: {
  file: TFile;
  user: TUser;
}) {
  const label =
    typeof file.contentType === "string" && file.contentType.includes("/")
      ? file.contentType.split("/")[1]
      : "unknown";
  const fileView = user.publicInfo?.fileView;
  return (
    <Link
      className="flex cursor-pointer flex-col rounded-lg bg-background shadow-xs ring-ring/20 hover:bg-background hover:ring dark:ring-ring/40"
      href={`/files/${file.slug}`}
    >
      {fileView?.showPreview && (
        <AspectRatio
          className="h-full w-full rounded-t-lg bg-muted"
          ratio={16 / 9}
        >
          <img
            alt={file.title}
            className="h-full w-full rounded-t-lg object-cover"
            height={100}
            src={
              file.contentType?.startsWith("image/")
                ? file.url
                : placeholder.src
            }
            width={100}
          />
        </AspectRatio>
      )}

      <div className="flex h-full cursor-pointer flex-col gap-4 p-5 py-5">
        {fileView?.showGroup && (
          <p className="flex items-center justify-between text-muted-foreground text-sm">
            {file.group?.title || ""}
          </p>
        )}
        {fileView?.showTitle && (
          <h3 className="font-semibold text-xl">{file.title}</h3>
        )}

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          {fileView?.showFileSize && (
            <p className="text-muted-foreground text-sm">
              {formatSize(Number(file.size) || 0).toString()}
            </p>
          )}
          {fileView?.showFileType && (
            <p className="text-muted-foreground text-sm uppercase"> {label}</p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          {fileView?.showAuthor && (
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
          {fileView?.showDate && (
            <p className="text-muted-foreground text-sm">
              {format(file.updatedAt, "MMM d, yyyy")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
