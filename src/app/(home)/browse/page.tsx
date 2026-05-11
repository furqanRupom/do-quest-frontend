import BrowseBounties from "@/components/modules/Home/Browse/BrowseBounties";
import { Metadata } from "next";

import { retriveBountiesAndTasks} from "@/services/bounty.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

export const metadata: Metadata = {
    title: "Do.Quest | Browse",
    description: "Do quests browse page",
};


const browseBountyPage = async ({
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
    queryFn: () => retriveBountiesAndTasks(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrowseBounties initialQueryString={queryString} />
    </HydrationBoundary>
  )
}

export default browseBountyPage
