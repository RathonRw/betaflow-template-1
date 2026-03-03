import { Suspense } from "react";
import { UserAbout, UserAboutSkeleton } from "@/features/about";
import UserBlogs from "@/features/home/blogs";

export default function UserPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="flex flex-col gap-10">
        <Suspense fallback={<UserAboutSkeleton />}>
          <UserAbout />
        </Suspense>
        <Suspense>
          <UserBlogs />
        </Suspense>
      </div>
    </section>
  );
}
