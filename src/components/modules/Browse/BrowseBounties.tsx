"use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Plus, Search, Filter, Clock,
    DollarSign, FileText, SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────────

type BountyStatus = 'active' | 'closed' | 'pending';

interface Bounty {
    id: string;
    title: string;
    category: string;
    reward: number;
    status: BountyStatus;
    submissions: number;
    deadline: string;
    description: string;
    postedAt: string;
    postedBy: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const MOCK_BOUNTIES: Bounty[] = [
    {
        id: '1',
        title: 'Fix authentication bug in Next.js app',
        category: 'Development',
        reward: 250,
        status: 'active',
        submissions: 3,
        deadline: '2025-05-10',
        description: 'JWT token refresh is failing silently on mobile clients. Need a clean fix with tests.',
        postedAt: '2025-04-01',
        postedBy: 'Alex R.',
    },
    {
        id: '2',
        title: 'Design a landing page for SaaS product',
        category: 'Design',
        reward: 400,
        status: 'active',
        submissions: 7,
        deadline: '2025-05-15',
        description: 'Modern, conversion-focused landing page. Figma source file required.',
        postedAt: '2025-04-03',
        postedBy: 'Sara M.',
    },
    {
        id: '3',
        title: 'Write 5 SEO blog posts on AI tools',
        category: 'Writing',
        reward: 150,
        status: 'active',
        submissions: 12,
        deadline: '2025-05-20',
        description: 'Each post should be 1200+ words targeting specific long-tail keywords.',
        postedAt: '2025-03-15',
        postedBy: 'James K.',
    },
    {
        id: '4',
        title: 'Penetration test on staging environment',
        category: 'Ethical Hacking',
        reward: 600,
        status: 'active',
        submissions: 0,
        deadline: '2025-05-30',
        description: 'Full scope pentest, OWASP top 10 minimum. Report with severity ratings.',
        postedAt: '2025-04-10',
        postedBy: 'Nina T.',
    },
    {
        id: '5',
        title: 'Translate app UI to Spanish & French',
        category: 'Translation',
        reward: 120,
        status: 'active',
        submissions: 5,
        deadline: '2025-05-28',
        description: '~800 strings. Context-aware translation, not just literal. Native speakers only.',
        postedAt: '2025-03-10',
        postedBy: 'Leo B.',
    },
    {
        id: '6',
        title: 'Clip highlights from 10 YouTube videos',
        category: 'Clipping',
        reward: 80,
        status: 'active',
        submissions: 2,
        deadline: '2025-05-12',
        description: 'Extract the best 60–90 second clips from each video. Export as MP4.',
        postedAt: '2025-04-08',
        postedBy: 'Dana W.',
    },
];

const CATEGORIES = [
    'All', 'Clipping', 'Ethical Hacking', 'Development',
    'Design', 
] as const;
type Category = typeof CATEGORIES[number];

// ── Bounty Card ────────────────────────────────────────────────────────────────

const BountyCard = ({ bounty }: { bounty: Bounty }) => {
    const daysLeft = Math.ceil(
        (new Date(bounty.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Card className='group hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <CardHeader className='pb-2 pt-5 px-5'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex-1 min-w-0'>
                        <Badge variant="outline" className='text-xs font-medium text-muted-foreground mb-2'>
                            {bounty.category}
                        </Badge>
                        <h3 className='font-semibold text-base text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2'>
                            {bounty.title}
                        </h3>
                    </div>
                    <div className='text-right shrink-0'>
                        <div className='flex items-center gap-0.5 text-primary font-bold text-xl leading-none'>
                            <DollarSign className='w-4 h-4' />
                            {bounty.reward}
                        </div>
                        <p className='text-xs text-muted-foreground mt-0.5'>reward</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className='px-5 pb-5'>
                <p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
                    {bounty.description}
                </p>

                <div className='flex items-center justify-between flex-wrap gap-2'>
                    <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                            <FileText className='w-3.5 h-3.5' />
                            {bounty.submissions} submission{bounty.submissions !== 1 ? 's' : ''}
                        </span>
                        <span className='flex items-center gap-1'>
                            <Clock className='w-3.5 h-3.5' />
                            {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                        </span>
                        <span>by {bounty.postedBy}</span>
                    </div>
                    <Button size="sm" className='h-8 text-xs gap-1.5' asChild>
                        <Link href={`/browse/${bounty.id}`}>
                            View Bounty
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

// ── Empty State ────────────────────────────────────────────────────────────────

const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-24 text-center'>
        <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4'>
            <Search className='w-7 h-7 text-muted-foreground' />
        </div>
        <h3 className='font-semibold text-foreground mb-1'>No bounties found</h3>
        <p className='text-sm text-muted-foreground mb-6'>
            No active bounties at the moment. Be the first to post one!
        </p>
        <Button className='gap-2' asChild>
            <Link href="/post-bounty">
                <Plus className='w-4 h-4' />
                Post a Bounty
            </Link>
        </Button>
    </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────

const BrowseBounties = () => {
    const [search, setSearch] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState<Category>('All');

    const filtered = React.useMemo(() => {
        return MOCK_BOUNTIES.filter((b) => {
            const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
            const matchesSearch =
                search.trim() === '' ||
                b.title.toLowerCase().includes(search.toLowerCase()) ||
                b.category.toLowerCase().includes(search.toLowerCase()) ||
                b.description.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory]);

    return (
        <div className='min-h-screen bg-[#f8f9fb]'>

            {/* ── Hero ── */}
            <div className='bg-background border-b border-border/60'>
                <div className='max-w-5xl mx-auto px-4 py-14 text-center'>
                    <h1 className='text-4xl font-bold text-foreground tracking-tight mb-3'>
                        Find your next opportunity
                    </h1>
                    <p className='text-muted-foreground text-base max-w-md mx-auto mb-8'>
                        From quick tasks to complex projects, find bounties that match
                        your skills and start earning on your own terms.
                    </p>

                    {/* Search */}
                    <div className='relative max-w-2xl mx-auto'>
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                        <Input
                            placeholder='Search by skills, keywords, or category...'
                            className='pl-11 h-12 text-sm bg-background rounded-xl shadow-sm'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className='max-w-5xl mx-auto px-4 py-8'>

                {/* Category filter */}
                <div className='flex items-center gap-2 mb-6 overflow-x-auto pb-1'>
                    <SlidersHorizontal className='w-4 h-4 text-muted-foreground shrink-0' />
                    <span className='text-sm font-medium text-foreground shrink-0 mr-1'>
                        Filter by category:
                    </span>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border
                                transition-all duration-150 whitespace-nowrap
                                ${activeCategory === cat
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                {filtered.length > 0 && (
                    <p className='text-xs text-muted-foreground mb-4'>
                        Showing <span className='font-medium text-foreground'>{filtered.length}</span> bount{filtered.length !== 1 ? 'ies' : 'y'}
                    </p>
                )}

                {/* Grid / Empty */}
                {filtered.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {filtered.map(bounty => (
                            <BountyCard key={bounty.id} bounty={bounty} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBounties;