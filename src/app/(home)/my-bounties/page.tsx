import { Metadata } from "next";

import { retriveAllMyBounties } from "@/services/bounty.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import MyBountiesTable from "@/components/modules/Home/MyBounties/MyBountiesTable";

export const metadata: Metadata = {
  title: "My Bounties - Do.Quest",
  description: "Do my bounties page",
};



const myBountiesPage = async ({
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
    queryKey: ['bounty'],
    queryFn: () => retriveAllMyBounties(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })


  return (

 <HydrationBoundary state={dehydrate(queryClient)}>
    <section className="max-w-7xl mx-auto py-20 min-h-screen">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          My Bounties
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage and track all the bounties you’ve created, including their status, submissions, and deadlines.
        </p>
      </div>

      {/* Table */}
      <MyBountiesTable initialQueryString={queryString} />

    </section>
  </HydrationBoundary>    
  )
}

export default myBountiesPage
