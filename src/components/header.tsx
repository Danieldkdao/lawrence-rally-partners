import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MobileSidebarLinks } from "./mobile-sidebar-links";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { NavLink } from "@/lib/types";

const links: NavLink[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Media",
    href: "/media",
  },
];

export const Header = () => {
  return (
    <header className="shrink-0 border-b bg-background/90 px-6 py-4 backdrop-blur-sm fixed top-0 right-0 left-0 z-20">
      <div className="w-full max-w-400 mx-auto flex items-center gap-2 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="text-lg md:text-2xl font-semibold">
            Lawrence Rally Partners
          </span>
        </Link>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.href || link.label}>
                {link.href ? (
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "text-lg")}
                    render={<Link href={link.href}>{link.label}</Link>}
                  />
                ) : (
                  <>
                    <NavigationMenuTrigger className="text-lg">
                      Services
                    </NavigationMenuTrigger>
                    {link.sublinks?.length && (
                      <NavigationMenuContent className="flex flex-col w-full">
                        {link.sublinks.map((sublink) => (
                          <NavigationMenuLink
                            key={sublink.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "text-lg w-full flex justify-start",
                            )}
                            render={
                              <Link href={sublink.href}>{sublink.label}</Link>
                            }
                          />
                        ))}
                      </NavigationMenuContent>
                    )}
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <MobileSidebarLinks links={links} />
      </div>
    </header>
  );
};
