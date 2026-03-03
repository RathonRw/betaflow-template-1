import { UserAbout } from "@/features/about";
import UserBlogs from "@/features/home/blogs";

export default function UserPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="flex flex-col gap-10">
        <UserAbout />
        <UserBlogs />
      </div>
    </section>
  );
}
