import Link from "next/link";

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
    label: "Sessions",
    href: "/sessions",
  },
];

export const Header = () => {
  return (
    <header className="shrink-0 border-b bg-background/90 px-6 py-4 backdrop-blur-sm fixed top-0 right-0 left-0 z-20">
      <div className="w-full max-w-400 mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-semibold">
            Lawrence Rally Partners
          </span>
        </Link>
        <div className="items-center gap-6 hidden sm:flex">
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
      </div>
    </header>
  );
};
