"use client"

import { IWallet, IWalletTransaction } from "@/types/wallet.types";
import { WalletPayouts } from "./Payouts";
import { WalletStats } from "./WalletStats";
import { WalletTransactions } from "./WalletTransactions";
import { useQuery } from "@tanstack/react-query";
import { getMyWallet, retrieveWalletTransactions } from "@/services/wallet.service";

interface WalletProps {
  queryString: string;
}
 
export const Wallet = ({ queryString }: WalletProps) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getMyWallet(),
  });

  const { data: transactionsData, isLoading: isTransactionsLoading, isFetching: isTransactionsFetching } = useQuery({
    queryKey: ["transactions", queryString],
    queryFn: () => retrieveWalletTransactions(queryString),
  });

  // Better defaults
  const wallet: IWallet = data?.success && data?.data ? data.data : {
    availableBalance: 0,
    pendingBalance: 0,
    totalEarnings: 0,
  };

  const walletTransactionsData: IWalletTransaction[] = transactionsData?.success 
    ? transactionsData?.data ?? [] 
    : [];

  const walletTransactionsMeta = transactionsData?.success 
    ? transactionsData?.meta 
    : null;

  const isBusy = isLoading || isFetching || isTransactionsLoading || isTransactionsFetching;

  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen bg-background">
      {/* If you have background glow divs, you can use: */}
      {/* <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(var(--primary)/0.05),transparent_50%)]" /> */}

      <div className="mb-12 relative z-10">
        <h1 className="text-4xl font-black text-foreground tracking-tight font-sans mb-2">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your earnings, payouts, and financial history.
        </p>
      </div>

      <div className="relative z-10">
        <WalletStats wallet={wallet} isLoading={isBusy} />
        <WalletPayouts />
        <WalletTransactions 
          transactions={walletTransactionsData} 
          meta={walletTransactionsMeta} 
          isLoading={isTransactionsLoading || isTransactionsFetching}
        />
      </div>
    </main>
  );
};
