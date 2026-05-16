"use client"

import { getBountySubmissions } from "@/services/submission.service"
import { useQuery } from "@tanstack/react-query"

interface BountySubmissionsProps {
  bountyId:string
  queryString:string
}
const BountySubmissionsTable = ({bountyId,queryString}: BountySubmissionsProps) => {
  const {data,isLoading} = useQuery({
    queryKey:['submission'],
    queryFn:() => getBountySubmissions(bountyId,queryString)
  })
  console.log(data)
 return <h3>bounty Submissions Table</h3>
}

export default BountySubmissionsTable
