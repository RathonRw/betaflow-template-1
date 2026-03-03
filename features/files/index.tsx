import { BlogsCategories } from "../categories";
import { getMyFiles } from "../data/files";
import { getMe } from "../data/user";
import FileCards from "./cards";

export default async function UserFiles() {
  const { data: files } = await getMyFiles();
  const { data: user } = await getMe();

  const categoryMap = new Map<string, { title: string; slug: string }>();

  categoryMap.set("all", { title: "All Files", slug: "all" });

  for (const file of files) {
    if (file.group?.slug) {
      categoryMap.set(file.group.slug, {
        title: file.group.title ?? "",
        slug: file.group.slug,
      });
    }
  }

  const categories = Array.from(categoryMap.values());

  return (
    <>
      <BlogsCategories categories={categories} />
      <FileCards files={files} user={user} />
    </>
  );
}
