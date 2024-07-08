import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <PageHeader className="max-w-3xl">
      <PageHeaderHeading className="text-balance">Login</PageHeaderHeading>
      <PageHeaderDescription>
        Enter details to login to your account
      </PageHeaderDescription>
      <PageActions>
        <div className="grid gap-4 w-full">
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Sign up
            </Link>
          </div>
        </div>
      </PageActions>
    </PageHeader>
  );
}
