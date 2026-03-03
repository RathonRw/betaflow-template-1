import type { Metadata } from "next";
import UserFiles from "@/features/files";

export const metadata: Metadata = {
  title: "Files",
};

export default function UserPage() {
  return (
    <section className="py-16 lg:py-20">
      <UserFiles />
    </section>
  );
}
