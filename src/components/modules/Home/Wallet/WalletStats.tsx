"use client"

import { Wallet, Clock, TrendingUp, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IWallet } from "@/types/wallet.types";

interface WalletStatsProps {
  wallet: IWallet;
  isLoading?: boolean;
}

export function WalletStats({ wallet, isLoading = false }: WalletStatsProps) {
  const stats = [
    {
      label: "Available Balance",
      value: `$${wallet.availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Ready for withdrawal",
      icon: Wallet,
      accent: "from-primary to-primary/80",
      bar: "bg-primary",
      textColor: "text-primary",
    },
    {
      label: "Pending Balance",
      value: `$${wallet.pendingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Processing in 3–5 days",
      icon: Clock,
      accent: "from-secondary to-secondary/80",
      bar: "bg-secondary",
      textColor: "text-secondary",
    },
    {
      label: "Total Earnings",
      value: `$${wallet.totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Lifetime achievement",
      icon: TrendingUp,
      accent: "from-accent to-primary",
      bar: "bg-accent",
      textColor: "text-accent",
    },
  ];

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Skeleton cards */}</div>;
  }

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="relative overflow-hidden bg-card border-border backdrop-blur-xl"
          >
            {/* Left accent bar */}
            <div className={`absolute top-0 left-0 w-[3px] h-full ${stat.bar}`} />
            <CardContent className="p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-foreground mb-3 font-sans tracking-tight">
                {stat.value}
              </h3>
              <div className={`flex items-center gap-2 ${stat.textColor}`}>
                <stat.icon size={14} />
                <span className="text-sm font-medium">{stat.subtext}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transfer Funds CTA */}
      <Card className="mb-16 bg-card border-border backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/30">
                <Wallet size={22} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground font-sans">Transfer Funds</h4>
                <p className="text-muted-foreground text-sm">
                  Instant payout to your connected bank account.
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold px-8 py-6 rounded-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] hover:-translate-y-0.5 transition-all duration-200 w-full md:w-auto flex items-center gap-2">
              <Rocket size={16} />
              Withdraw to Stripe
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
