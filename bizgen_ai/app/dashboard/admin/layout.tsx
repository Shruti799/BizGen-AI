import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // hooks
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.role === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}