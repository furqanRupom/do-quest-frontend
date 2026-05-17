import { Metadata } from "next";

import { getMyBountySubmissions } from "@/services/submission.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import MyBountySubmissionstable from "@/components/modules/Home/Submissions/MyBountySubmissionsTable";


export const metadata: Metadata = {
  title: "Submissions - Do.Quest",
  description: "View and manage your submissions for various quests on Do.Quest. Track your progress, receive feedback, and engage with the community to enhance your learning experience.",
};



interface bountySubmissionProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const myBountySubmissionsPage = async ({ searchParams }: bountySubmissionProps) => {

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
    queryKey: ['my-submission'],
    queryFn: () => getMyBountySubmissions(queryString),
    staleTime: 1000 * 60 * 60,     // 1 hour
    gcTime: 1000 * 60 * 60 * 6,    // 6 hours
  })
  /*
  1. TODO : here we take care of own bounties, view, edit, and resubmit request etc. 
 
  */
  return <HydrationBoundary state={dehydrate(queryClient)}>
    <section className="max-w-7xl mx-auto">

      <MyBountySubmissionstable queryString={queryString} />

    </section>
  </HydrationBoundary>
}

export default myBountySubmissionsPage;
