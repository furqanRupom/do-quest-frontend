"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IUser } from "@/types/user.types"
import { IUpdateProfilePayload } from "@/zod/settings.validation"

export async function retriveAllUsers(queryString: string) {
  try {
    return await httpClient.get<IUser[]>(
      queryString ? `/admin/users?{queryString}` : "/admin/users"
    )
  } catch (error) {
    console.log("Error fetching tasks and bounties for admin : ", error)
    throw error
  }
}

export async function updateUserAdmin(id: string, payload: IUpdateProfilePayload) {
  try {
    return await httpClient.put(`/admin/users/${id}`, payload)
  } catch (error) {
    console.log("Error while updating user profile : ", error)
  }
}

export async function getUserAdmin(id: string) {
  try {
    return await httpClient.get<IUser>(`/admin/users/${id}`)
  } catch (error) {
    console.log("Error while fetching user profile : ", error)
    throw error
  }
}

