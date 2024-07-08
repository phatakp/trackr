import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PageHeader className="max-w-3xl">
        <PageHeaderHeading className="text-balance">Uh Oh!</PageHeaderHeading>
        <PageHeaderDescription>
          The requested page does not exist.
        </PageHeaderDescription>
        <PageActions>
          <Link
            prefetch={false}
            href={"/"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Back to Home
          </Link>
        </PageActions>
      </PageHeader>
    </main>
  );
}
