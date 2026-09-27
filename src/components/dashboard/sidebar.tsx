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
    <Sidebar collapsible="icon" className="min-w-0">
      <SidebarHeader className="min-w-0">
        <SidebarMenu className="min-w-0">
          <SidebarMenuItem className="min-w-0">
            <SidebarMenuButton
              size="lg"
              tooltip="Lawrence Rally Partners"
              render={<Link href="/dashboard" />}
              className="min-w-0 flex items-center gap-2 px-0! h-18"
            >
              <div
                className="
                  relative size-14 shrink-0
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

              <div className="flex-1 min-w-0">
                <span
                  className="
                  block text-lg font-semibold
                  group-data-[collapsible=icon]:hidden
                "
                >
                  Lawrence Rally Partners
                </span>
              </div>
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
