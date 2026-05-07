"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IAccountSecurityPayload, IUpdateProfilePayload } from "@/zod/settings.validation";

export async function updateUserSettings(payload: IUpdateProfilePayload) {
  try {
    return await httpClient.put<ApiResponse<IUpdateProfilePayload>>('/users/profile', payload);

  }
  catch (error) {
    console.log("Error while updating user settings :", error)
    throw error
  }
}

export async function accountSecurity(payload: IAccountSecurityPayload) {
  try {
    return await httpClient.put<ApiResponse<null>>('/users/change-password', payload)
  }
  catch (error) {
    console.log("Error while updating account security :", error)
    throw error
  }
}

export async function deleteMyAccount() {
  try {
    return await httpClient.delete<ApiResponse<null>>('/users/delete-account')
  }
  catch (error) {
    console.log("Error whilte deleting my account :", error)
    throw error
  }
}
