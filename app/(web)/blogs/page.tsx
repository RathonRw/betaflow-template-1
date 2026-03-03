import type { Metadata } from "next";
import UserBlogs from "@/features/home/blogs";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function UserPage() {
  return (
    <section className="py-16 lg:py-20">
      <UserBlogs />
    </section>
  );
}
