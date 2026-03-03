import BlogCards from "../blogs/cards";
import { BlogsCategories } from "../categories";
import { getMyBlogs } from "../data/blogs";
import { getMe } from "../data/user";

export default async function UserBlogs() {
  const { data: blogs } = await getMyBlogs();
  const { data: user } = await getMe();

  const categoryMap = new Map<string, { title: string; slug: string }>();

  categoryMap.set("all", { title: "All Blogs", slug: "all" });

  for (const blog of blogs) {
    if (blog.group?.slug) {
      categoryMap.set(blog.group.slug, {
        title: blog.group.title ?? "",
        slug: blog.group.slug,
      });
    }
  }

  if (blogs.length === 0 || user === null) {
    return null;
  }

  const categories = Array.from(categoryMap.values());

  return (
    <>
      <BlogsCategories categories={categories} />
      <BlogCards blogs={blogs} user={user} />
    </>
  );
}
