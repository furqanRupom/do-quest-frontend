

"use client";
import { Profile } from "@/types/profile.types";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
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
  const [loggingOut, setLoggingOut] = React.useState(false);
  const router = useRouter();

  const navActions = [
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
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    setOpen(false);
    await userLogout();
    router.push("/sign-in");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Open profile menu"
          className={`
            ${
              fullWidth
                ? "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border/50 bg-accent/5 hover:bg-accent/10"
                : "flex items-center gap-2 px-1.5 py-1 rounded-xl hover:bg-accent/10"
            }
            transition-all duration-200 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary/40
          `}
        >
          <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold ring-2 ring-primary/20 ring-offset-2 ring-offset-background group-hover:ring-primary/40 transition-all duration-200 select-none">
            {firstLetter}
          </span>
          {fullWidth && (
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-sm font-semibold text-foreground truncate leading-tight w-full">
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
        className="w-44 p-1.5 rounded-xl border border-border/60 shadow-lg"
      >
        {/* Nav links */}
        {navActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-150 outline-none focus-visible:bg-accent/10"
          >
            {action.icon}
            {action.label}
          </Link>
        ))}

        {/* Divider */}
        <div className="my-1 border-t border-border/50" />

        {/* Sign out */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed outline-none focus-visible:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </PopoverContent>
    </Popover>
  );
};
