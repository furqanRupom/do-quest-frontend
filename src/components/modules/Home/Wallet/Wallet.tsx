"use client"

import { IWallet, IWalletTransaction } from "@/types/wallet.types";
import { WalletPayouts } from "./Payouts";
import { WalletStats } from "./WalletStats";
import { WalletTransactions } from "./WalletTransactions";
import { useQuery } from "@tanstack/react-query";
import { getMyWallet, retrieveWalletTransactions } from "@/services/wallet.service";
import { Profile } from "@/types/profile.types";

interface WalletProps {
  queryString: string;
  profile: Profile;
}
 
export const Wallet = ({ queryString, profile }: WalletProps) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getMyWallet(),
  });

  const { data: transactionsData, isLoading: isTransactionsLoading, isFetching: isTransactionsFetching } = useQuery({
    queryKey: ["transactions", queryString],
    queryFn: () => retrieveWalletTransactions(queryString),
  });

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

  // Using initial isLoading prevents layout shift and flashing skeletons on background refetch
  const isWalletLoading = isLoading; 
  const isTransactionsBusy = isTransactionsLoading || isTransactionsFetching;

  return (
    <main className="pt-20 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen bg-background">
      <div className="mb-12 relative z-10">
        <h1 className="text-3xl font-black text-foreground tracking-tight font-sans mb-2">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your earnings, payouts, and financial history.
        </p>
      </div>
      
      <div className="relative z-10">
        <WalletStats wallet={wallet} isLoading={isWalletLoading} />
        
        {/* Assuming profile loading is tied to wallet loading for simplicity, or adjust as needed */}
        <WalletPayouts profile={profile} isLoading={isWalletLoading} /> 
        
        <WalletTransactions 
          transactions={walletTransactionsData} 
          meta={walletTransactionsMeta} 
          isLoading={isTransactionsBusy}
        />
      </div>
    </main>
  );
};
