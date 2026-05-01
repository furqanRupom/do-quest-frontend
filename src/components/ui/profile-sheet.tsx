"use client";

import { Profile } from "@/types/profile.types";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { userLogout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface ProfileSheetProps {
  profile: Profile;
  firstLetter: string;
  fullWidth?: boolean;
}

export const ProfileSheet: React.FC<ProfileSheetProps> = ({
  profile,
  firstLetter,
  fullWidth,
}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const actions = [
    {
      href: `/${profile.role.toLocaleLowerCase()}/dashboard`,
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="w-4 h-4" />,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Open profile menu"
          className={`
            ${fullWidth
              ? "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/50 bg-accent/5 hover:bg-accent/10"
              : ""
            }
            transition-all duration-200 cursor-pointer group
          `}
        >
          <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold ring-2 ring-primary/20 ring-offset-2 ring-offset-background group-hover:ring-primary/40 transition-all duration-200">
            {firstLetter}
          </span>
          {fullWidth && (
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-semibold text-foreground truncate leading-tight">
                {profile.name}
              </span>
              <span className="text-xs text-muted-foreground capitalize leading-tight">
                {profile.role}
              </span>
            </div>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-52 p-0 rounded-xl border border-border/60 shadow-lg"
      >
        {/* Profile info */}
        <div className="flex items-center gap-2.5 px-3 py-3 border-b border-border/50">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
            {firstLetter}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {profile.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              @{profile.username}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-1.5 py-1.5">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-150"
            >
              {action.icon}
              {action.label}
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <div className="px-1.5 pb-1.5 border-t border-border/50 pt-1.5">
          <button
            onClick={async () => {
              setOpen(false);
              await userLogout()
              router.push("/sign-in")
            }}
            className="flex w-full items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
