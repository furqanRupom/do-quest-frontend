"use client";
import * as React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X, ChevronRight, LogOut } from "lucide-react";
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

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isAuthenticated = !!profile;

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/my-bounties", label: "My Bounties" },
    { href: "/submissions", label: "Submissions" },
    { href: "/wallet", label: "Wallet" },
  ];

  // Links specifically for authenticated users in the mobile menu
  const authMobileLinks = [
    { href: `/${profile?.role}/dashboard`, label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ];

  const firstLetter = profile?.name?.charAt(0)?.toUpperCase() ?? "?";

  const handleSignOut = async () => {
    // TODO: Replace with your actual sign-out logic (e.g., await signOut())
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="h-[76px]" />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
        <nav
          className={`
            sticky top-0 z-50 flex items-center justify-between h-[56px] w-[95%] 
            rounded-full mx-auto max-w-7xl
            transition-all duration-500 ease-in-out
            ${
              isScrolled
                ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-border p-5"
                : "border border-transparent"
            }
          `}
        >
          <Logo />

          {/* Desktop Navigation */}
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
                    ${
                      isActive
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
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
                <Link
                  href="/sign-in"
                  className="text-base font-bold transition-colors"
                >
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer relative text-primary hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              <span
                className={`transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-90 opacity-0 absolute"
                    : "rotate-0 opacity-100"
                }`}
              >
                <Menu className="w-5 h-5 text-primary" />
              </span>
              <span
                className={`transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-0 opacity-100"
                    : "-rotate-90 opacity-0 absolute"
                }`}
              >
                <X className="w-5 h-5 text-primary" />
              </span>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-[76px] left-0 right-0 md:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="mx-4 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-[calc(100vh-100px)] overflow-y-auto">
            {/* Regular Navigation Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl
                      text-base font-semibold transition-all duration-200
                      active:scale-[0.98]
                      ${
                        isActive
                          ? "text-foreground bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }
                    `}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Authenticated Only Links */}
              {isAuthenticated && (
                <>
                  <div className="my-2 h-px bg-border" />
                  {authMobileLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center justify-between px-4 py-3 rounded-xl
                          text-base font-semibold transition-all duration-200
                          active:scale-[0.98]
                          ${
                            isActive
                              ? "text-foreground bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                          }
                        `}
                      >
                        <span>{link.label}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground/40"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </>
              )}
            </div>

            {/* Actions Divider */}
            <div className="my-3 h-px bg-border" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                asChild
                size="lg"
                className="w-full cursor-pointer py-3 text-base font-bold shadow-lg shadow-primary/20 scale-[0.98] active:scale-95 transition-all duration-300 hover:brightness-110"
              >
                <Link
                  href="/post-bounty"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-5 h-5" />
                  Post Bounty
                </Link>
              </Button>

              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full cursor-pointer py-3 text-base font-bold scale-[0.98] active:scale-95 transition-all duration-300 text-destructive border-destructive/40 hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full cursor-pointer py-3 text-base font-bold scale-[0.98] active:scale-95 transition-all duration-300"
                >
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
