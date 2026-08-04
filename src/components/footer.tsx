import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="mt-32 border-t px-6 py-4 flex items-center justify-center">
      <div className="w-full flex items-center gap-4 justify-between max-w-400">
        <Link
          href="https://www.instagram.com/lawrencerallypartners"
          target="_blank"
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "size-10 max-md:[&_svg]:size-6 md:size-14",
          )}
        >
          <FaInstagram className="size-10 text-foreground/60" />
        </Link>
        <span className="text-base font-medium text-muted-foreground">
          ©2026 Lawrence Rally Partners. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
