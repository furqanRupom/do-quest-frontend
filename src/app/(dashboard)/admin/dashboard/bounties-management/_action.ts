"use server"

import { changeBountyAndTaskStatus, deleteBountyAndTask, getBountyAndTaskById, updateBountyAndTask } from "@/services/bounty.service"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { IChangeTaskAndBountyStatus, ITaskAndBounty } from "@/types/bounty.types"
import { IUpdateBountyTaskPayload, updateBountyTaskSchema } from "@/zod/bounty.validation"

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}


export const updateBountiesTaskAction = async (
  id: string,
  payload: IUpdateBountyTaskPayload,
): Promise<ApiResponse<ITaskAndBounty> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid bounties id",
    }
  }

  const parsedPayload = updateBountyTaskSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }

  try {
    return await updateBountyAndTask(id, parsedPayload.data)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update bounty"),
    }
  }
}

export const deleteBountyTaskAction = async (
  id: string,
): Promise<ApiResponse<boolean> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid bounty id",
    }
  }

  try {
    return await deleteBountyAndTask(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete bounty"),
    }
  }
}

export const getBountyTaskByIdAction = async (
  id: string,
): Promise<ApiResponse<ITaskAndBounty> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid bounty id",
    }
  }

  try {
    return await getBountyAndTaskById(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch bounty or tasks details"),
    }
  }
}

export const changeTaskBountyStatusAction = async (id: string, payload: IChangeTaskAndBountyStatus) => {
  if (!id) {
    return {
      success: false,
      message: "Invalid bounty or task id"
    }
  }

  try {
    return await changeBountyAndTaskStatus(id, payload)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change status of bounty or task")
    }
  }
}
