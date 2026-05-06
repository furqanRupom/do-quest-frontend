import BountiesTaskTable from "@/components/modules/Admin/BountiesTaskManagement/BountiesTaskTable"
import {retriveAllTaskBountiesAdmin} from "@/services/bounty.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const BountiesTaskManagementPage = async ({
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
    queryFn: () => retriveAllTaskBountiesAdmin(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BountiesTaskTable initialQueryString={queryString} />
    </HydrationBoundary>
  )
}

export default BountiesTaskManagementPage
