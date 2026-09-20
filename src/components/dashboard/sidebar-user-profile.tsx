"use client";

import { useAuthSession } from "@/hooks/use-auth-session";
import { authClient } from "@/lib/auth/auth-client";
import { GENERAL_ERROR_MESSAGE } from "@/lib/constants";
import { ChevronUp, CircleUserRound, LogOutIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { UserProfile } from "../user-profile";
import { useRouter } from "next/navigation";

export const SidebarUserProfile = () => {
  const { data: session } = useAuthSession();
  const [isLoggingOut, startLoggingOut] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startLoggingOut(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message || GENERAL_ERROR_MESSAGE);
          },
        },
      });
    });
  };

  if (!session) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton size="lg" tooltip="Account" />}
            >
              <UserProfile {...session.user} className="size-10" />
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-base font-semibold">
                  {session.user.name}
                </span>
                <span className="truncate text-sm text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
              <ChevronUp className="ml-auto size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={-5}
              alignOffset={40}
              className="w-auto!"
            >
              <div className="flex flex-col gap-0.5 p-2">
                <span className="text-base font-semibold">
                  {session.user.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
              <DropdownMenuItem>
                <CircleUserRound />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOutIcon /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
