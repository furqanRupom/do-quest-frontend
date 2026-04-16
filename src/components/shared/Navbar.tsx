"use client"
import * as React from 'react';
import Logo from '../logo/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar: React.FunctionComponent = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
    const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/browse', label: 'Browse' },
        { href: '/my-bounties', label: 'My Bounties' },
        { href: '/submissions', label: 'Submissions' },
        { href: '/wallet', label: 'Wallet' },
    ];

    return (
        <>
            {/* Spacer so content doesn't hide under fixed navbar */}
            <div className='h-[76px]' />

            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
                <nav
                    className={`
                        sticky top-0 z-50 flex items-center justify-between px-6 h-[56px] w-[95%]
                        rounded-full mx-auto max-w-7xl
                        transition-all duration-500 ease-in-out
                        ${isScrolled
                            ? [
                                'bg-background/80',
                                'backdrop-blur-xl',
                                'shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
                                'border border-white/10',
                            ].join(' ')
                            : 'bg-background border border-transparent'
                        }
                    `}
                >
                    {/* Logo */}
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
                                        ${isActive
                                            ? 'text-foreground bg-accent/10'
                                            : 'text-muted-foreground hover:bg-accent/10'
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
                        <Link
                            href="/sign-in"
                            className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Sign In
                        </Link>
                        <Button
                            size="lg"
                            className=" cursor-pointer px-5 py-2 text-md font-bold shadow-lg shadow-primary/20 scale-95 active:scale-90 transition-all duration-300 hover:brightness-110 gap-1.5 "
                        >
                            <Plus className="w-5 h-5" />
                            <span className=''>Post Bounty</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="secondary"
                        size="icon"
                        className="md:hidden h-9 w-9 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(p => !p)}
                        aria-label="Toggle menu"
                    >
                        <span className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
                            <Menu className="w-5 h-5" />
                        </span>
                        <span className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
                            <X className="w-5 h-5" />
                        </span>
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`
                        fixed top-[76px] left-0 right-0 md:hidden
                        transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    `}
                >
                    <div
                        className={`
                            mx-4 p-5 rounded-2xl
                            bg-background/95 backdrop-blur-xl
                            border border-white/10
                            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                        `}
                    >
                        <ul className="flex flex-col mb-5">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`
                                                flex items-center gap-3 py-3 text-base font-medium
                                                border-b border-border/30 last:border-0
                                                transition-colors duration-150
                                                ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                                            `}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span
                                                className={`
                                                    w-1.5 h-5 rounded-full shrink-0
                                                    transition-all duration-200
                                                    ${isActive ? 'bg-primary opacity-100' : 'bg-transparent opacity-0'}
                                                `}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="flex flex-col gap-2.5">
                            <Button
                                size="default"
                                className="w-full cursor-pointer gap-1.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Plus className="w-4 h-4" />
                                Post Bounty
                            </Button>
                            <Button
                                size="default"
                                variant="outline"
                                className="w-full  backdrop-blur-sm text-base"
                                onClick={() => setIsMobileMenuOpen(false)}
                                asChild
                            >
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;