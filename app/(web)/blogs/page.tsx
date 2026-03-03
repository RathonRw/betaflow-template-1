import type { Metadata } from "next";
import { Suspense } from "react";
import UserBlogs from "@/features/home/blogs";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function UserPage() {
  return (
    <section className="py-16 lg:py-20">
      <Suspense>
        <UserBlogs />
      </Suspense>
    </section>
  );
}
