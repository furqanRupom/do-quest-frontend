import UsersTable from "@/components/modules/Admin/UsersManagement/UsersTable"
import { retriveAllUsers } from "@/services/user.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const UsersTaskManagementPage = async ({
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
    queryKey: ["users", queryString],
    queryFn: () => retriveAllUsers(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable initialQueryString={queryString} />
    </HydrationBoundary>
  )
}

export default UsersTaskManagementPage
