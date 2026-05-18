"use client";

import { Wallet, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IWallet } from "@/types/wallet.types";
import { WalletStatsSkeleton } from "@/components/skeleton/WalletStatsSkeleton";

function formatMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface WalletStatsProps {
  wallet: IWallet;
  isLoading?: boolean;
}

export function WalletStats({ wallet, isLoading = false }: WalletStatsProps) {
  if (isLoading) {
    return <WalletStatsSkeleton />;
  }

  const stats = [
    {
      label: "Available Balance",
      value: formatMoney(wallet.availableBalance),
      subtext: "Ready for withdrawal",
      icon: Wallet,
      bar: "bg-primary",
      textColor: "text-primary",
    },
    {
      label: "Pending Balance",
      value: formatMoney(wallet.pendingBalance),
      subtext: "Processing in 3–5 days",
      icon: Clock,
      bar: "bg-secondary",
      textColor: "text-secondary",
    },
    {
      label: "Total Earnings",
      value: formatMoney(wallet.totalEarnings),
      subtext: "Lifetime achievement",
      icon: TrendingUp,
      bar: "bg-accent",
      textColor: "text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="relative overflow-hidden bg-card border-border backdrop-blur-xl"
        >
          {/* left accent bar */}
          <div className={`absolute top-0 left-0 w-[3px] h-full ${stat.bar}`} />

          <CardContent className="p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {stat.label}
            </p>

            <h3 className="text-2xl font-black text-foreground mb-2 font-sans tracking-tight">
              {stat.value}
            </h3>

            <div className={`flex items-center gap-2 ${stat.textColor}`}>
              <stat.icon size={16} />
              <span className="text-sm font-medium">{stat.subtext}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
