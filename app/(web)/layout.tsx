import { ThemeSwitcher } from "@/components/theme-switcher";
import { getMe } from "@/features/data/user";
import SiteHeader from "@/features/site-header";

export async function generateMetadata() {
  const { data: user } = await getMe();
  if (user === null) {
    return {
      title: "User Not Found",
      description: "User Not Found",
    };
  }

  return {
    title: {
      default: user.name,
      template: `%s | ${user.name}`,
    },
    description: user.publicInfo?.bio,
    openGraph: {
      title: user.name,
      description: user.publicInfo?.bio,
      images: [
        {
          url: user.image || "",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: user.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: user.name,
      description: user.publicInfo?.bio,
      images: [user.image || ""],
    },
  };
}

export default async function Layout(props: LayoutProps<"/">) {
  const { data: user } = await getMe();
  return (
    <main className="container mx-auto flex min-h-screen max-w-7xl flex-col bg-muted/30 selection:bg-primary selection:text-primary-foreground">
      <SiteHeader user={user} />
      {props.children}
      <div className="mt-auto flex w-full items-center justify-end py-6">
        <ThemeSwitcher />
      </div>
    </main>
  );
}
