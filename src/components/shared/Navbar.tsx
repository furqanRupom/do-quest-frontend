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
            <div className='h-16' />

            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500 ease-in-out
                    ${isScrolled
                        ? [
                            'bg-background/60',
                            'backdrop-blur-xl',
                            'backdrop-saturate-150',
                            'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)]',
                            'border-b border-white/10',
                        ].join(' ')
                        : 'bg-background border-b border-transparent'
                    }
                `}
            >
                {/* Subtle top highlight line when scrolled */}
                <div
                    className={`
                        absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-primary/30 to-transparent
                        transition-opacity duration-500
                        ${isScrolled ? 'opacity-100' : 'opacity-0'}
                    `}
                />

                <div className='flex justify-between items-center max-w-7xl mx-auto h-16 px-4'>

                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex gap-1 items-center'>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`
                                            relative px-3 py-2 rounded-md text-sm font-medium
                                            transition-all duration-200
                                            hover:text-primary hover:bg-primary/8
                                            ${isActive ? 'text-primary' : 'text-muted-foreground'}
                                        `}
                                    >
                                        {link.label}
                                        {/* Active underline pip */}
                                        <span
                                            className={`
                                                absolute bottom-1 left-3 right-3 h-0.5 rounded-full
                                                bg-primary transition-all duration-300 origin-center
                                                ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                                            `}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop Buttons */}
                    <div className='hidden md:flex items-center gap-2.5'>
                        <Button size="sm" className='cursor-pointer gap-1.5 transition-all duration-200'>
                            <Plus className='w-4 h-4' />
                            <span>Post Bounty</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className='cursor-pointer backdrop-blur-sm transition-all duration-200'
                            asChild
                        >
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className='md:hidden'
                        onClick={() => setIsMobileMenuOpen(p => !p)}
                        aria-label="Toggle menu"
                    >
                        <span className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
                            <Menu className='w-5 h-5' />
                        </span>
                        <span className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
                            <X className='w-5 h-5' />
                        </span>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`
                        md:hidden overflow-hidden
                        transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div
                        className={`
                            px-4 pt-2 pb-5 border-t border-white/10
                            ${isScrolled ? 'bg-background/50 backdrop-blur-xl' : 'bg-background'}
                        `}
                    >
                        <ul className='flex flex-col mb-4'>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`
                                                flex items-center gap-2.5 py-3 text-sm font-medium
                                                border-b border-border/30 last:border-0
                                                transition-colors duration-150
                                                hover:text-primary
                                                ${isActive ? 'text-primary' : 'text-muted-foreground'}
                                            `}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span
                                                className={`
                                                    w-1 h-4 rounded-full shrink-0
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

                        <div className='flex flex-col gap-2'>
                            <Button
                                size="default"
                                className='w-full gap-1.5'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Plus className='w-4 h-4' />
                                Post Bounty
                            </Button>
                            <Button
                                size="default"
                                variant="outline"
                                className='w-full backdrop-blur-sm'
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