"use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ExternalLink, Search, CircleAlert, Info
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type TransactionType = 'bounty_funding' | 'bounty_payout' | 'withdrawal';

interface Transaction {
    id: string;
    type: TransactionType;
    description: string;
    amount: number;
    date: string;
}

// ── Mock Data (empty to match screenshot) ─────────────────────────────────────

const MOCK_TRANSACTIONS: Transaction[] = [];

const TRANSACTION_TYPE_LABELS: Record<TransactionType | 'all', string> = {
    all: 'All Types',
    bounty_funding: 'Bounty Funding',
    bounty_payout: 'Bounty Payout',
    withdrawal: 'Withdrawal',
};

// ── Stat Card ──────────────────────────────────────────────────────────────────

interface BalanceCardProps {
    label: string;
    amount: number;
    color: 'green' | 'yellow' | 'default';
    hint?: string;
}

const BalanceCard = ({ label, amount, color, hint }: BalanceCardProps) => {
    const amountClass =
        color === 'green' ? 'text-emerald-500' :
            color === 'yellow' ? 'text-amber-500' :
                'text-foreground';

    return (
        <Card>
            <CardContent className='p-5'>
                <div className='flex items-center gap-1.5 mb-3'>
                    <p className='text-sm text-muted-foreground font-medium'>{label}</p>
                    {hint && (
                        <Info className='w-3.5 h-3.5 text-muted-foreground/60 cursor-help' />
                    )}
                </div>
                <p className={`text-3xl font-bold ${amountClass}`}>
                    ${amount.toFixed(2)}
                </p>
            </CardContent>
        </Card>
    );
};

// ── Main Page ──────────────────────────────────────────────────────────────────

const Wallet = () => {
    const [search, setSearch] = React.useState('');
    const [typeFilter, setTypeFilter] = React.useState<string>('all');

    const availableBalance = 0;
    const pendingBalance = 0;
    const totalEarned = 0;

    const filtered = React.useMemo(() => {
        return MOCK_TRANSACTIONS.filter(t => {
            const matchesType = typeFilter === 'all' || t.type === typeFilter;
            const matchesSearch =
                search.trim() === '' ||
                t.description.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [search, typeFilter]);

    return (
        <div className='min-h-screen bg-[#f8f9fb]'>
            <div className='max-w-6xl mx-auto px-4 py-10'>

                {/* ── Page Header ── */}
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-foreground tracking-tight'>Wallet</h1>
                    <Button className='gap-2'>
                        <ExternalLink className='w-4 h-4' />
                        Withdraw to Stripe
                    </Button>
                </div>

                {/* ── Main Grid ── */}
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6'>

                    {/* ── Left Column ── */}
                    <div className='flex flex-col gap-6'>

                        {/* Balance Cards */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <BalanceCard
                                label="Available Balance"
                                amount={availableBalance}
                                color="green"
                            />
                            <BalanceCard
                                label="Pending Balance"
                                amount={pendingBalance}
                                color="yellow"
                                hint="Funds pending clearance"
                            />
                            <BalanceCard
                                label="Total Earned"
                                amount={totalEarned}
                                color="default"
                            />
                        </div>

                        {/* Transaction History */}
                        <Card>
                            <CardHeader className='pb-1'>
                                <CardTitle className='text-base font-semibold'>
                                    Transaction History
                                </CardTitle>
                                <p className='text-sm text-muted-foreground'>
                                    Your completed transactions including bounty funding, bounty payouts, and withdrawals to Stripe
                                </p>
                            </CardHeader>

                            <CardContent className='pt-4'>
                                {/* Search + Filter */}
                                <div className='flex gap-3 mb-6'>
                                    <div className='relative flex-1'>
                                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                        <Input
                                            placeholder='Search transactions...'
                                            className='pl-9'
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                                        <SelectTrigger className='w-[160px]'>
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(TRANSACTION_TYPE_LABELS).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Empty State */}
                                {filtered.length === 0 ? (
                                    <div className='flex items-center justify-center py-16 text-sm text-muted-foreground'>
                                        No transactions found matching your criteria.
                                    </div>
                                ) : (
                                    <div className='flex flex-col divide-y divide-border'>
                                        {filtered.map(tx => (
                                            <div key={tx.id} className='flex items-center justify-between py-3.5'>
                                                <div>
                                                    <p className='text-sm font-medium text-foreground'>
                                                        {tx.description}
                                                    </p>
                                                    <p className='text-xs text-muted-foreground mt-0.5'>
                                                        {new Date(tx.date).toLocaleDateString('en-US', {
                                                            month: 'short', day: 'numeric', year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`text-sm font-semibold ${tx.amount >= 0 ? 'text-emerald-600' : 'text-rose-500'
                                                    }`}>
                                                    {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* ── Right Column: Payouts ── */}
                    <div>
                        <Card>
                            <CardContent className='p-5'>
                                <h2 className='text-base font-semibold text-foreground mb-4'>Payouts</h2>

                                {/* Badges */}
                                <div className='flex items-center gap-2 mb-4'>
                                    <Badge className='bg-indigo-600 hover:bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded'>
                                        stripe
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className='text-amber-600 border-amber-300 bg-amber-50 gap-1 text-xs'
                                    >
                                        <CircleAlert className='w-3 h-3' />
                                        Setup Required
                                    </Badge>
                                </div>

                                {/* Description */}
                                <p className='text-sm text-muted-foreground mb-5 leading-relaxed'>
                                    Your payouts are securely processed by Stripe. You can use the self-serve Stripe Express
                                    dashboard to handle all payment-related settings, bank accounts, tax forms and detailed
                                    transaction records.
                                </p>

                                {/* CTA */}
                                <Button variant="outline" className='w-full gap-2'>
                                    <ExternalLink className='w-4 h-4' />
                                    Complete Setup
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;