
import * as React from 'react';
import Logo from '@/components/logo/Logo';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className='bg-card border-t border-border'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                {/* Main footer content */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                    {/* Company info */}
                    <div className='space-y-4 pb-2'>
                        <Logo />
                        <p className='text-muted-foreground text-sm leading-relaxed'>
                            The ultimate platform for bounties and quests. Connect talented individuals
                            with exciting opportunities and earn rewards for your skills.
                        </p>
                        <div className='flex gap-4'>
                            <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                                <Twitter className='h-5 w-5' />
                            </Link>
                            <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                                <Github className='h-5 w-5' />
                            </Link>
                            <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                                <Linkedin className='h-5 w-5' />
                            </Link>
                            <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                                <Mail className='h-5 w-5' />
                            </Link>
                        </div>
                    </div>

                    {/* Platform links */}
                    <div className='space-y-4'>
                        <h3 className='font-semibold text-foreground'>Platform</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href="/browse" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Browse Bounties
                                </Link>
                            </li>
                            <li>
                                <Link href="/post-bounty" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Post a Bounty
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-bounties" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    My Bounties
                                </Link>
                            </li>
                            <li>
                                <Link href="/submissions" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Submissions
                                </Link>
                            </li>
                            <li>
                                <Link href="/wallet" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Wallet
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support links */}
                    <div className='space-y-4'>
                        <h3 className='font-semibold text-foreground'>Support</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href="/help" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/status" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    System Status
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div className='space-y-4'>
                        <h3 className='font-semibold text-foreground'>Legal</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href="/privacy" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/dmca" className='text-muted-foreground hover:text-primary transition-colors text-sm'>
                                    DMCA Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className='pt-8 border-t border-border'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-muted-foreground text-sm'>
                            © {new Date().getFullYear()} Do.Quest. All rights reserved.
                        </p>
                        <div className='flex gap-6 text-sm'>
                            <Link href="/sitemap" className='text-muted-foreground hover:text-primary transition-colors'>
                                Sitemap
                            </Link>
                            <Link href="/accessibility" className='text-muted-foreground hover:text-primary transition-colors'>
                                Accessibility
                            </Link>
                            <Link href="/careers" className='text-muted-foreground hover:text-primary transition-colors'>
                                Careers
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
