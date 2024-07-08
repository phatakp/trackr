"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";

export function ProtectedPageHeader() {
  const path = usePathname();
  const { user, isLoading } = useKindeBrowserClient();
  const title = path.slice(1);

  if (isLoading)
    return (
      <>
        <Skeleton className="mx-auto max-w-3xl py-8 pb-4 text-center text-3xl font-extrabold md:text-5xl lg:leading-[1.1]">
          #
        </Skeleton>
        <Skeleton className="max-w-[750px] text-center text-lg">#</Skeleton>
      </>
    );

  return (
    <PageHeader className="max-w-3xl">
      <PageHeaderHeading className="text-balance capitalize">
        {title}
      </PageHeaderHeading>
      <PageHeaderDescription>
        {user?.given_name} {user?.family_name}
      </PageHeaderDescription>
    </PageHeader>
  );
}
