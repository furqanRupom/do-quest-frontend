"use client";
import * as React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Profile } from "@/types/profile.types";
import { ProfileSheet } from "../ui/profile-sheet";
import { ThemeToggle } from "../ui/theme-toggle";

type NavbarProps = {
  profile: Profile | null;
};

const Navbar = ({ profile }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthenticated = !!profile;

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/my-bounties", label: "My Bounties" },
    { href: "/submissions", label: "Submissions" },
    { href: "/wallet", label: "Wallet" },
  ];

  const firstLetter = profile?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <>
      <div className="h-[76px]" />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
        <nav
          className={`
            sticky top-0 z-50 flex items-center justify-between h-[56px] w-[95%] 
            rounded-full mx-auto max-w-7xl
            transition-all duration-500 ease-in-out
            ${isScrolled
              ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-border p-5"
              : "border border-transparent"
            }
          `}
        >
          <Logo />

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-5 py-2 text-base font-semibold
                    transition-all duration-300 rounded-full
                    scale-95 active:scale-90
                    ${isActive
                      ? "text-foreground bg-accent/10"
                      : "text-muted-foreground hover:bg-accent/10"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle /> {/* <-- Added Here */}
            
            <Button
              asChild
              size="lg"
              className="cursor-pointer px-5 py-2 text-md font-bold shadow-lg shadow-primary/20 scale-95 active:scale-90 transition-all duration-300 hover:brightness-110"
            >
              <Link href="/post-bounty" className="flex items-center gap-1.5">
                <Plus className="w-5 h-5" />
                Post Bounty
              </Link>
            </Button>

            {isAuthenticated ? (
              <ProfileSheet profile={profile!} firstLetter={firstLetter} />
            ) : (
              <Button
                size="lg"
                className="cursor-pointer px-5 py-2 text-md font-bold shadow-lg shadow-primary/20 scale-95 active:scale-90 transition-all duration-300 hover:brightness-110"
              >
                <Link href="/sign-in" className="text-base font-bold transition-colors">
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle /> {/* <-- Added Here for Mobile */}
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 cursor-pointer"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              <span className={`transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}>
                <Menu className="w-5 h-5" />
              </span>
              <span className={`transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                <X className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed top-[76px] left-0 right-0 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="mx-4 p-5 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            {/* ... mobile menu content stays the same ... */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
