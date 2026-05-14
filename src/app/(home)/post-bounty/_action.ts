"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { addNewBountyAndTask } from "@/services/bounty.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { ITaskAndBounty } from "@/types/bounty.types"
import { createBountyTaskSchema, ICreateBountyTaskPayload } from "@/zod/bounty.validation"

export const createNewBountyAction= async (
  payload:ICreateBountyTaskPayload,
): Promise<ApiResponse<ITaskAndBounty> | ApiErrorResponse> => {

  
  const parsedPayload = createBountyTaskSchema.safeParse(payload)

   
  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }
  try {
   return  await addNewBountyAndTask(parsedPayload.data)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create new bounty"),
    }
  }
}
