"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show nothing or a neutral state until mounted
  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1 p-1 rounded-full bg-muted border border-border"
        aria-label="Toggle theme"
      >
        <div className="p-1.5 rounded-full">
          <Moon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div className="p-1.5 rounded-full">
          <Sun className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "flex items-center gap-1 p-1 rounded-full cursor-pointer transition-colors duration-300",
        "bg-muted border border-border hover:bg-accent/20"
      )}
      aria-label="Toggle theme"
    >
      {/* Moon Button */}
      <div
        className={cn(
          "p-1.5 rounded-full transition-all duration-300",
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-sm scale-100"
            : "text-muted-foreground scale-95 opacity-70 hover:opacity-100"
        )}
      >
        <Moon className="w-3.5 h-3.5" />
      </div>

      {/* Sun Button */}
      <div
        className={cn(
          "p-1.5 rounded-full transition-all duration-300",
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-sm scale-100"
            : "text-muted-foreground scale-95 opacity-70 hover:opacity-100"
        )}
      >
        <Sun className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
