import { Suspense } from "react";
import UserBlog from "@/features/blogs/blog";
import { getMyBlogs } from "@/features/data/blogs";
import { getMe } from "@/features/data/user";

export async function generateMetadata(props: PageProps<"/blogs/[slug]">) {
  const { slug } = await props.params;

  const { data: blogs } = await getMyBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);
  if (blog === null || blog === undefined) {
    return {
      title: "Blog Not Found",
      description: "Blog Not Found",
    };
  }

  return {
    title: {
      default: blog.title,
      template: `%s | ${blog.title}`,
    },
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: blog.updatedAt,
      // authors: [blog.user.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const { data: blogs } = await getMyBlogs();

  return blogs.slice(0, 5).map((blog) => ({
    slug: blog.slug,
  }));
}

export default function UserBlogPage(props: PageProps<"/blogs/[slug]">) {
  return (
    <Suspense>
      <SuspendedUserBlog {...props} />
    </Suspense>
  );
}

async function SuspendedUserBlog(props: PageProps<"/blogs/[slug]">) {
  const { slug } = await props.params;
  const { data: user } = await getMe();
  const { data: blogs } = await getMyBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);
  return (
    <section className="py-16 lg:py-20">
      <UserBlog blog={blog} user={user} />
    </section>
  );
}
