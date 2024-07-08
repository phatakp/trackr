import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = headers();
  const url = headerList.get("x-url");
  const title = url?.split(process.env.KINDE_SITE_URL!).at(-1)?.slice(1);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col container">
      <PageHeader className="max-w-3xl">
        <PageHeaderHeading className="text-balance capitalize">
          {title}
        </PageHeaderHeading>
        <PageHeaderDescription>
          {user.given_name} {user.family_name}
        </PageHeaderDescription>
      </PageHeader>
      {children}
    </div>
  );
}
