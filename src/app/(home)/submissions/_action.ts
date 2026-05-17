/* my bounty submissions */

"use server";

import { getActionErrorMessage } from "@/lib/errorMessage";
import { resubmitBountySubmission } from "@/services/submission.service";
import { ISubmissionPayload, submissionSchema } from "@/zod/submission.validation";

export const resubmitBountySubmissionAction = async (submissionId:string, payload:ISubmissionPayload) => {

  if(!submissionId) {
    return {
      success:false,
      message:"Invalid submission Id"
    }
  }

  const parsedPayload = submissionSchema.safeParse(payload)

  
  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }

  try {
    return await resubmitBountySubmission(submissionId,parsedPayload.data)
  }catch(error) {
    return {
      success:false,
      message:getActionErrorMessage(error,"Failed to resubmit submissions")
    }
  }
}

