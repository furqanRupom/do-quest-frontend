"use client"

import { Wallet, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IWallet } from "@/types/wallet.types";
import { WalletStatsSkeleton } from "@/components/skeleton/WalletStatsSkeleton";

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
      bar: "bg-primary",
      textColor: "text-primary",
    },
    {
      label: "Pending Balance",
      value: `$${wallet.pendingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Processing in 3–5 days",
      icon: Clock,
      bar: "bg-secondary",
      textColor: "text-secondary",
    },
    {
      label: "Total Earnings",
      value: `$${wallet.totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Lifetime achievement",
      icon: TrendingUp,
      bar: "bg-accent",
      textColor: "text-gray-400",
    },
  ];

  if (isLoading) {
    return <WalletStatsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="relative overflow-hidden bg-card border-border backdrop-blur-xl"
        >
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
  );
}
