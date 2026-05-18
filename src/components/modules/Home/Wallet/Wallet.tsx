"use client"

import { IWallet } from "@/types/wallet.types";
import { WalletPayouts } from "./Payouts";
import { WalletStats } from "./WalletStats";
import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getMyWallet, retrieveWalletTransactions } from "@/services/wallet.service";
import { Profile } from "@/types/profile.types";
import { PaginationMeta } from "@/types/api.types";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useSearchParams } from "next/navigation";
import { walletTransactionColumns } from "./WalletTransactionsColumns";

interface WalletProps {
  queryString?: string;
  profile: Profile;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const Wallet = ({ queryString: initialQueryString = "", profile }: WalletProps) => {
  const searchParams = useSearchParams();

  // Pagination Hook
  const {
    queryStringFromUrl,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  // Search Hook
  const { searchTermFromUrl, handleDebouncedSearchChange } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  });

  // Clean query string (remove default page=1)
  let finalQueryString = queryStringFromUrl || initialQueryString;

  if (finalQueryString.includes("page=1") && !finalQueryString.includes("page=2")) {
    finalQueryString = finalQueryString
      .replace("?page=1", "")
      .replace("&page=1", "")
      .replace("page=1&", "")
      .replace(/[?&]$/, "");
  }

  const { data: walletData, isLoading: isWalletLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getMyWallet(),
  });

  const { data: transactionsData, isLoading: isTransactionsLoading, isFetching: isTransactionsFetching } = useQuery({
    queryKey: ["transactions", finalQueryString || "default"],
    queryFn: async () => {
      const res = await retrieveWalletTransactions(finalQueryString || "");
      return res ?? { success: false, data: [], meta: undefined };
    },
  });

  const wallet: IWallet = walletData?.success && walletData?.data ? walletData.data : {
    availableBalance: 0,
    pendingBalance: 0,
    totalEarnings: 0,
  };

  const transactions = transactionsData?.success ? transactionsData?.data ?? [] : [];
  const meta: PaginationMeta | undefined = transactionsData?.success 
    ? (transactionsData?.meta ?? undefined) 
    : undefined;

  const isBusy = isTransactionsLoading || isTransactionsFetching || isRouteRefreshPending;

  return (
    <main className="pt-20 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen bg-background">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-foreground tracking-tight font-sans mb-2">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your earnings, payouts, and financial history.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Stats + Payouts Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <WalletStats wallet={wallet} isLoading={isWalletLoading} />

        {/* Transactions Table - Search Enabled, Filtering Removed */}
        <DataTable 
          data={transactions}
          columns={walletTransactionColumns}
          isLoading={isBusy}
          emptyMessage="No transactions found."
          sorting={undefined} 
          pagination={{
            state: optimisticPaginationState,
            onPaginationChange: handlePaginationChange,
          }}
          search={{
            initialValue: searchTermFromUrl,
            placeholder: "Search transactions...",
            debounceMs: 700,
            onDebouncedChange: handleDebouncedSearchChange,
          }}
          // Filters prop removed (no filtering)
        />
          </div>
          
          <div className="lg:col-span-4">
            <WalletPayouts profile={profile} isLoading={isWalletLoading} />
          </div>
        </div>

      </div>
    </main>
  );
};
