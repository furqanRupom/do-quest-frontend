
import { Metadata } from "next";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { retrieveWalletTransactions } from "@/services/wallet.service";
import { Wallet } from "@/components/modules/Home/Wallet/Wallet";

export const metadata: Metadata = {
    title: "Do.Quest | Browse",
    description: "Do quests browse page",
};


const walletPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key]

      if (value === undefined) return ""

      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join("&")
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean)
    .join("&")

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["tasks", queryString],
    queryFn: () => retrieveWalletTransactions(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wallet queryString={queryString} />
    </HydrationBoundary>
  )
}

export default walletPage

