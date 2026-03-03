"use client";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getUserInitials } from "@/lib/utils";
import profileImg from "@/public/gradient_1.jpg";
import type { TUser } from "./types";

const navItems = [
  { display: "Home", href: "/" },
  { display: "Blogs", href: "/blogs" },
  { display: "Files", href: "/files" },
];
export default function SiteHeader({ user }: { user: TUser | null }) {
  const pathname = usePathname();

  if (user === null) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-10 flex w-full items-center justify-between py-6">
      <div className="w-20">
        {pathname !== "/" && (
          <Link href="/">
            <Avatar className="size-10 rounded-full">
              <AvatarImage src={user.image || profileImg.src} />
              <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
      <div className="flex items-center rounded-full bg-background px-4 py-2 shadow-2xs">
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              className={cn(
                "",
                pathname === item.href && "font-medium text-brand",
              )}
              href={item.href as Route}
              key={item.display}
            >
              {item.display}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
