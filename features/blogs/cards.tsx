"use client";
import { useFilters } from "@/lib/nuqs-params";
import type { TBlog, TUser } from "../types";
import BlogCard from "./card";
import EmptyBlog from "./empty-blog";

export default function BlogCards({
  blogs,
  user,
}: {
  blogs: TBlog[];
  user: TUser;
}) {
  const [{ q, category }] = useFilters();

  if (q) {
    blogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(q.toLowerCase()),
    );
  }
  if (category && category !== "all") {
    blogs = blogs.filter((blog) => blog.group.slug === category);
  }

  if (blogs.length === 0 || user === null) {
    return (
      <EmptyBlog
        link={{ url: `/user/${user.username}`, title: "Back to Home" }}
      />
    );
  }
  return (
    <section className="grid grid-cols-1 gap-4 overflow-hidden px-1 py-5 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, i) => (
        <BlogCard blog={blog} key={i} user={user} />
      ))}
      {/* <PaginationActions hasMore={hasMore} onLoadMore={onLoadMore} /> */}
    </section>
  );
}
