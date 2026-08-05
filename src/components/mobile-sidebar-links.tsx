import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { NavLink } from "@/lib/types";

export const MobileSidebarLinks = ({ links }: { links: NavLink[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="lg:hidden relative">
            <span className="absolute size-12 top-1/2 left-1/2 -translate-1/2 pointer-coarse:hidden" />
            <MenuIcon />
          </Button>
        }
        className="cursor-pointer relative!"
      />
      <DropdownMenuContent align="end">
        {links.map((link) =>
          link.href ? (
            <DropdownMenuItem
              key={link.href}
              render={<Link href={link.href}>{link.label}</Link>}
              className="text-lg"
            />
          ) : link.sublinks?.length ? (
            <DropdownMenuSub key={link.label}>
              <DropdownMenuSubTrigger className="text-lg">
                {link.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {link.sublinks.map((sublink) => (
                    <DropdownMenuItem
                      key={sublink.href}
                      render={<Link href={sublink.href}>{sublink.label}</Link>}
                      className="text-lg"
                    />
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : null,
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
