"use client"

import { getMyBountySubmissions } from "@/services/submission.service"
import { useQuery } from "@tanstack/react-query"

interface MySubmissionProps {
  queryString: string
}

const MyBountySubmissionstable = ({ queryString }: MySubmissionProps) => {

  const { data, isLoading } = useQuery({
    queryKey: ['my-submissions'],
    queryFn: () => getMyBountySubmissions(queryString)
  })
  console.log(data)
  return <h3>My Bounties Submission table</h3>
}
export default MyBountySubmissionstable
