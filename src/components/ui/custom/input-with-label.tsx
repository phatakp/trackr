"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
};

export function InputWithLabel({
  name,
  type,
  label,
  className,
  ...props
}: Props) {
  return (
    <div className="group relative z-0 w-full">
      <Input
        type={type}
        name={name}
        id={`${name}-id`}
        className={cn("peer h-10", className)}
        placeholder={" "}
        {...props}
      />
      <Label
        htmlFor={`${name}-id`}
        className={cn(
          "bg-primary text-primary-foreground peer-placeholder-shown:bg-primary peer-placeholder-shown:text-primary-foreground peer-focus:bg-background peer-focus:text-foreground absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-sm px-2 text-sm leading-none duration-300 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:py-1 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          type === "hidden" && "hidden"
        )}
      >
        {label}
      </Label>
    </div>
  );
}
