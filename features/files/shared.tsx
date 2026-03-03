"use client";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatSize } from "@/lib/utils";
import type { TFile, TUser } from "../types";

export default function SharedFile({
  user,
  file,
}: {
  user: TUser | null;
  file: TFile | undefined;
}) {
  if (file === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!file) {
    return (
      <div className="flex h-screen items-center justify-center">
        File not found
      </div>
    );
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(file.url);
      if (!res.ok) {
        toast.error("Failed to download file");
        return;
      }

      const blob = await res.blob();

      // You can customize this filename!
      const filename = file.title || "download";

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename; // <-- This triggers Save As dialog with this name
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="flex h-full min-h-[90vh] items-center justify-center">
      <div className="w-full max-w-[400px]">
        <div className="text-center">
          <h1 className="mb-2 font-serif text-lg">Download File</h1>

          <p className="mb-8 text-muted-foreground text-sm">
            <span className="font-semibold capitalize">{user?.name}</span> has
            shared a file with you
          </p>
        </div>

        <div className="space-y-4">
          <div className="mb-4 border-border border-b pb-4">
            <div className="flex items-center justify-between">
              <p className="truncate text-muted-foreground text-sm">
                {file.title}
              </p>
              <p className="font-mono text-muted-foreground text-xs">
                {formatSize(file.size || 0)}
              </p>
            </div>
          </div>

          <Button className="mt-6 w-full" onClick={handleDownload} size="lg">
            <span>Download File</span>
            <DownloadIcon className="size-4" />
          </Button>
        </div>

        <p className="mt-4 text-center text-muted-foreground text-xs">
          This download link is secure and will expire.
        </p>
      </div>
    </div>
  );
}
