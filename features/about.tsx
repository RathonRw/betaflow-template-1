import { format } from "date-fns";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaTiktok,
  FaTwitch,
  FaXTwitter,
} from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { api } from "@/convex/_generated/api";
import { getUserInitials } from "@/lib/utils";
import profileImg from "@/public/gradient_1.jpg";
import { getMe } from "./data/user";
import { PageHeaderDescription, PageHeaderHeading } from "./page-header";

const userSocialLinks = [
  {
    value: "twitter",
    label: "Twitter",
    icon: FaXTwitter,
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: FaSquareFacebook,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    value: "github",
    label: "Github",
    icon: FaGithub,
  },
  {
    value: "youtube",
    label: "Youtube",
    icon: FaYoutube,
  },
  {
    value: "tiktok",
    label: "Tiktok",
    icon: FaTiktok,
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: FaTwitch,
  },
  {
    value: "discord",
    label: "Discord",
    icon: FaDiscord,
  },
  {
    value: "website",
    label: "Website",
    icon: GlobeIcon,
  },
];

export async function UserAbout() {
  const { data: user, rateLimit } = await getMe();

  if (user === null) {
    return (
      <section className="relative">
        <div className="flex flex-col gap-5">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-5 w-40" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-100" />
            <Skeleton className="h-5 w-100" />
          </div>

          <div className="flex items-center gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className="h-5 w-5" key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (user === null) {
    return (
      <section className="relative">
        <p>User not found</p>
      </section>
    );
  }
  return (
    <section className="relative">
      <div className="flex flex-col gap-5">
        <Link href={`/user/${user.username}`}>
          <Avatar className="aspect-square size-16 rounded-full">
            <AvatarImage src={user.image || profileImg.src} />
            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Link>
        <PageHeaderHeading>{user.name}</PageHeaderHeading>
        {user.publicInfo?.bio && (
          <PageHeaderDescription>{user.publicInfo.bio}</PageHeaderDescription>
        )}

        <div className="flex items-center gap-4">
          {user.publicInfo?.socialMediaAccounts?.map((link, index) => {
            const socialLink = userSocialLinks.find(
              (l) => l.value === link.platform,
            );
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    className="rounded-full"
                    size="icon"
                    variant="ghost"
                  >
                    <a href={link.url} rel="noopener" target="_blank">
                      {socialLink ? (
                        <socialLink.icon className="size-5 transition-all hover:scale-105" />
                      ) : (
                        <GlobeIcon className="size-5 transition-all hover:scale-105" />
                      )}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="capitalize">
                  {link.platform}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <p className="text-muted-foreground text-xs">
          API Rate Limit: {rateLimit.used} / {rateLimit.limit} (remaining:{" "}
          {rateLimit.remaining}, resets at{" "}
          {format(rateLimit.reset, "MMM d, yyyy h:mm a")})
        </p>
      </div>
    </section>
  );
}
