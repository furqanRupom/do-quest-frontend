"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";

import {  IResetPasswordPayload, resetPasswordSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const resetPasswordAction = async (payload: IResetPasswordPayload,token:string): Promise<null | ApiErrorResponse> => {
    const parsedPayload = resetPasswordSchema.safeParse(payload);
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }

    try {

        const response = await httpClient.post<any>(`/reset-password?token=${token}`, parsedPayload.data);
        if (response.success) {
            redirect('/sign-in')

        }
        return null

    } catch (error: any) {
        console.log(error, "error");
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            message: `Reset password failed: ${error.message}`,
        }
    }
}