import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">{children}</div>
      </div>
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center lg:w-full lg:h-full">
        <Image
          src="/vercel.svg"
          alt="Image"
          width={500}
          height={300}
          className="dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
