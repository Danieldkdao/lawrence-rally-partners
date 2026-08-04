import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export const MobileSidebarLinks = ({
  links,
}: {
  links: { label: string; href: string }[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="md:hidden relative">
            <span className="absolute size-12 top-1/2 left-1/2 -translate-1/2 pointer-coarse:hidden" />
            <MenuIcon />
          </Button>
        }
        className="cursor-pointer relative!"
      />
      <DropdownMenuContent>
        {links.map((link) => (
          <DropdownMenuItem
            key={link.href}
            render={<Link href={link.href}>{link.label}</Link>}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
