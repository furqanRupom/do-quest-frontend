"use client"
import * as React from 'react';
import Logo from '../logo/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar: React.FunctionComponent = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { href: '/browse', label: "Browse" },
        { href: '/my-bounties', label: 'My Bounties' },
        { href: '/submissions', label: 'Submissions' },
        { href: '/wallet', label: 'Wallet' },
    ];

    return (
        <header className='shadow'>
            <div className='flex justify-between items-center max-w-7xl mx-auto py-2 px-4'>
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <ul className='hidden md:flex gap-5 items-center'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`hover:text-primary transition-colors ${pathname === link.href ? 'text-primary' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Buttons */}
                <div className='hidden md:inline-flex gap-5'>
                    <Button size="lg" className='cursor-pointer'>
                        <Plus />
                        <span>Post Bounty</span>
                    </Button>
                    <Button size="lg" className='cursor-pointer'>Sign In</Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className='md:hidden'
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden bg-background border-t'>
                    <div className='max-w-7xl mx-auto px-4 py-4'>
                        <ul className='flex flex-col gap-4 mb-4'>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`block py-2 hover:text-primary transition-colors ${pathname === link.href ? 'text-primary' : ''
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className='flex flex-col gap-3'>
                            <Button
                                size="lg"
                                className='cursor-pointer w-full'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Plus />
                                <span>Post Bounty</span>
                            </Button>
                            <Button
                                size="lg"
                                className='cursor-pointer w-full'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;