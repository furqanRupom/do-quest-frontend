import { Metadata } from "next";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { retrieveWalletTransactions } from "@/services/wallet.service";
import { Wallet } from "@/components/modules/Home/Wallet/Wallet";
import { getUserInfo } from "@/services/auth.service";

export const metadata: Metadata = {
    title: "Wallet - Do.Quest",
    description: "Manage your earnings, payouts, and financial history.",
};

const walletPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams;
  const profile = await getUserInfo();
  
  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key];
      if (value === undefined) return "";
      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  const queryClient = new QueryClient();

  // FIX: Wrap in try-catch and provide a fallback object so it never returns undefined
  await queryClient.prefetchQuery({
    queryKey: ["transactions", queryString],
    queryFn: async () => {
      try {
        const res = await retrieveWalletTransactions(queryString);
        return res ?? { success: false, data: [], meta: undefined };
      } catch (error) {
        // If the server fetch fails (e.g., auth issues), return a safe fallback
        return { success: false, data: [], meta: undefined };
      }
    },
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wallet profile={profile} queryString={queryString} />
    </HydrationBoundary>
  );
};

export default walletPage;
