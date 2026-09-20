"use client";

import { CalendarDaysIcon, LayoutDashboardIcon, UsersIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Players",
    url: "/dashboard/players",
    icon: UsersIcon,
  },
  {
    title: "Sessions",
    url: "/dashboard/sessions",
    icon: CalendarDaysIcon,
  },
];

export const DashboardSidebarContent = () => {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={<Link href={item.url} />}
                  isActive={pathname === item.url}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
