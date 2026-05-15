"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { submitBounty } from "@/services/submission.service"
import { ISubmissionPayload, submissionSchema } from "@/zod/submission.validation"

export const submitBountyAction = async (bountyId: string, payload: ISubmissionPayload) => {
  try {

    if (!bountyId) {
      return {
        success: false,
        message: "Invalid format bountId!"
      }
    }
    const parsedPayload = submissionSchema.safeParse(payload)

    if (!parsedPayload.success) {
      return {
        success: false,
        message: parsedPayload.error.issues[0]?.message || "Invalid input",
      }
    }

    return await submitBounty(bountyId, parsedPayload.data)
  }
  catch (error) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update bounty"),
    }
  }
}
