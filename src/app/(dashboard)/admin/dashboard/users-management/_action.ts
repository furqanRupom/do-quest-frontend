"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { getUserAdmin, updateUserAdmin } from "@/services/user.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { IUser } from "@/types/user.types"
import {  IUpdateUserPayload, updateUserValidationSchema } from "@/zod/settings.validation"


export const updateUserAction = async (id: string, payload: Partial<IUpdateUserPayload>) => {
  if (!id) {
    return {
      success: false,
      message: "Invalid id format"
    }
  }
  const parsedPayload = updateUserValidationSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }
  try {
    return await updateUserAdmin(id, parsedPayload.data)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update user")
    }
  }
}
export const getUserAction = async (id: string) : Promise<ApiResponse<IUser> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid id format"
    }
  }
  try {
    return await getUserAdmin(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetched user details")
    }
  }
}