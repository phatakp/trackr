import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <PageHeader className="max-w-3xl">
      <PageHeaderHeading className="text-balance">
        User Registration
      </PageHeaderHeading>
      <PageHeaderDescription>
        Enter details to create your new account
      </PageHeaderDescription>
      <PageActions>
        <div className="grid gap-4 w-full">
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Login
            </Link>
          </div>
        </div>
      </PageActions>
    </PageHeader>
  );
}
