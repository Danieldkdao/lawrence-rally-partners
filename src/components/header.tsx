import Link from "next/link";
import { MobileSidebarLinks } from "./mobile-sidebar-links";
import Image from "next/image";

const links = [
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: "Our services",
    href: "/",
  },
  {
    label: "Contact us",
    href: "/contact-us",
  },
  {
    label: "Media",
    href: "/media",
  },
];

export const Header = () => {
  return (
    <header className="shrink-0 border-b bg-background/90 px-6 py-4 backdrop-blur-sm fixed top-0 right-0 left-0 z-20">
      <div className="w-full max-w-400 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="text-lg md:text-2xl font-semibold">
            Lawrence Rally Partners
          </span>
        </Link>
        <div className="items-center gap-6 hidden md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground font-medium text-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <MobileSidebarLinks links={links} />
      </div>
    </header>
  );
};
