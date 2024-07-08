import { ProtectedPageHeader } from "@/components/common/protected-page-header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col container">
      <ProtectedPageHeader />
      {children}
    </div>
  );
}
