"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";

import { INeedCHangePasswordPayload, loginValidationZodSchema, needChangePasswordSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const needChangePasswordAction = async (payload: INeedCHangePasswordPayload, extraProps: { redirectPath?: string, email: string }): Promise<null | ApiErrorResponse> => {
    const parsedPayload = needChangePasswordSchema.safeParse(payload);
    const {  email } = extraProps
    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }

    try {

        const response = await httpClient.post<any>(`/auth/change-password?email=${email}`, parsedPayload.data);
        if (response.success) {
            redirect('/sign-in')

        }
        return null

    } catch (error: any) {
        console.log(error, "error");
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        // if (error && error.response && error.response.data.message === "Email not verified") {
        //     redirect(`/verify-email?email=${payload.email}`);
        // }
        return {
            success: false,
            message: `Change password failed: ${error.message}`,
        }
    }
}
