import { Suspense } from "react";
import { getMyFiles } from "@/features/data/files";
import { getMe } from "@/features/data/user";
import SharedFile from "@/features/files/shared";

export async function generateMetadata(props: PageProps<"/files/[slug]">) {
  const { slug } = await props.params;

  const { data: files } = await getMyFiles();
  const file = files.find((file) => file.slug === slug);
  if (file === null || file === undefined) {
    return {
      title: "File Not Found",
      description: "File Not Found",
    };
  }

  return {
    title: {
      default: file.title,
      template: `%s | ${file.title}`,
    },
    openGraph: {
      title: file.title,
      publishedTime: file.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: file.title,
    },
  };
}

export default function FilesPage(props: PageProps<"/files/[slug]">) {
  return (
    <Suspense>
      <SuspendedUserFile {...props} />
    </Suspense>
  );
}

async function SuspendedUserFile(props: PageProps<"/files/[slug]">) {
  const { slug } = await props.params;
  const { data: files } = await getMyFiles();
  const file = files.find((file) => file.slug === slug);
  const { data: user } = await getMe();
  return <SharedFile file={file} user={user} />;
}
