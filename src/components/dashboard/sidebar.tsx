"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { DashboardSidebarContent } from "./sidebar-content";
import { SidebarUserProfile } from "./sidebar-user-profile";

export const DashboardSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Lawrence Rally Partners"
              render={<Link href="/dashboard" />}
            >
              <div
                className="
                  relative size-10 shrink-0
                  transition-[width,height] duration-200
                  group-data-[collapsible=icon]:size-8 flex justify-center items-center
                "
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <span
                className="
                  truncate text-2xl font-semibold
                  group-data-[collapsible=icon]:hidden
                "
              >
                LRP
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <DashboardSidebarContent />
      <SidebarUserProfile />
      <SidebarRail />
    </Sidebar>
  );
};
