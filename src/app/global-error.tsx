"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col">
          <PageHeader className="max-w-3xl">
            <PageHeaderHeading className="text-balance">
              Something went wrong
            </PageHeaderHeading>
            <PageHeaderDescription>
              <pre>{JSON.stringify(error, null, 4)}</pre>
            </PageHeaderDescription>
            <PageActions>
              <Button onClick={() => reset()}>Try again</Button>
              <Link
                prefetch={false}
                href={"/"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Back to Home
              </Link>
            </PageActions>
          </PageHeader>
        </main>
      </body>
    </html>
  );
}
