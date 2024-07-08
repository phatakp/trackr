"use client";

import { buttonVariants } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  return (
    <form className="grid gap-4">
      <InputWithLabel
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <LoginLink
        authUrlParams={{
          connection_id: process.env.NEXT_PUBLIC_EMAIL_CONN_ID!,
          login_hint: email,
        }}
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        Next
      </LoginLink>

      <div className="my-4 relative h-0.5 bg-input">
        <span className="absolute text-sm text-muted-foreground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background px-4">
          or continue with
        </span>
      </div>

      <LoginLink
        authUrlParams={{
          connection_id: process.env.NEXT_PUBLIC_GOOGLE_CONN_ID!,
        }}
        className={cn(buttonVariants())}
      >
        Use your Google account
      </LoginLink>
    </form>
  );
}
