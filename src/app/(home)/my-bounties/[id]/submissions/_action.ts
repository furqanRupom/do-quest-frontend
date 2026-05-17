/* view submissions */
"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { approveBountySubmission, rejectBountySubmission, revisionBountySubmission } from "@/services/submission.service"
import { IRejectionSubmissionPayload, IRevisionSubmissionPayload, rejectBountySubmissionSchema, revisionBountySubmissionSchema } from "@/zod/submission.validation"

export const approvedBountySubmissionAction = async (bountyId: string, submissionId: string) => {
  if (!bountyId || !submissionId) {
    return {
      success: false,
      message: "Invalid bounty or submission Id"
    }
  }

  try {
    return await approveBountySubmission(bountyId, submissionId)

  } catch (error:any) {
    console.log(error.response)
    console.error("Approved Submissions : ", error)
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to approved submission")
    }

  }
}




export const rejectBountySubmissionAction = async (submissionId: string, payload: IRejectionSubmissionPayload) => {

  if (!submissionId) {
    return {
      success: false,
      message: "Invalid submission Id"
    }
  }
  const parsedPayload = rejectBountySubmissionSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }



  try {
    return await rejectBountySubmission(submissionId, parsedPayload.data)
  } catch (error) {
    return {
      succcess: false,
      message: getActionErrorMessage(error, "Failed to reject submissions")
    }
  }

}
export const revisionBountySubmissionAction = async (submissionId: string, payload: IRevisionSubmissionPayload) => {

  if (!submissionId) {
    return {
      success: false,
      message: "Invalid submission Id"
    }
  }
  const parsedPayload = revisionBountySubmissionSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }



  try {
    return await revisionBountySubmission(submissionId, parsedPayload.data)
  } catch (error) {
    console.error("Submission Revision : ", error)
    return {
      succcess: false,
      message: getActionErrorMessage(error, "Failed to revision submissions")
    }
  }

}
