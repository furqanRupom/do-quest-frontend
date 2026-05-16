import BountySubmissionsTable from "@/components/modules/Home/MyBounties/BountySubmissions/BountySubmissioinsTable"
import { getBountySubmissions } from "@/services/submission.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

interface bountySubmissionProps {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const bountySubmissionsPage = async ({ params, searchParams }: bountySubmissionProps) => {
  const { id } = await params

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
    queryKey: ['submission'],
    queryFn: () => getBountySubmissions(id, queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
 /*
 1. TODO : here we going to handle approve submissions, reject submissions, we give them granted for resubmit submissions,

 */
  return <HydrationBoundary state={dehydrate(queryClient)}>
    <BountySubmissionsTable bountyId={id} queryString={queryString} />
  </HydrationBoundary>
}

export default bountySubmissionsPage;
