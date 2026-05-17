import BountySubmissionsTable from "@/components/modules/Home/Submissions/BountySubmissionsTable"
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
  return  <HydrationBoundary state={dehydrate(queryClient)}>

    <section className="max-w-7xl mx-auto min-h-screen py-20 ">

      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          View Bounties Submissions
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage and track all the submitted bounties have submitted from your tasks, including their status, submissions, and deadlines.
        </p>
      </div>
    <BountySubmissionsTable bountyId={id} queryString={queryString} />
    </section>
  </HydrationBoundary>
}

export default bountySubmissionsPage;
