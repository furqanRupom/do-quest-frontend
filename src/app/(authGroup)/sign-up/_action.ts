"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse } from "@/types/auth.types";

import { IRegisterPayload, registerValidationZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const registerAction = async (payload: IRegisterPayload, redirectPath?: string): Promise<IRegisterResponse | ApiErrorResponse> => {
    const parsedPayload = registerValidationZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    }
  }
  
  try {

    const response = await httpClient.post<IRegisterResponse>("/auth/register", parsedPayload.data);

    const user = response.data;
    const { role, needPasswordChange, email } = user;


    if (needPasswordChange) {
      //TODO : refactoring
      redirect(`/reset-password?email=${email}`);
    } else {
      // TODO : for now we going to just redirecting to dashboard for testing purpose we will update it as well
      // redirect(redirectPath || "/dashboard");
    //   const targetPath = redirectPath && isValidRedirectForRole(redirectPath, role as UserRole) ? redirectPath : getDefaultDashboardRoute(role as UserRole);


      redirect("/sign-in");
    }

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
      message: `Sign Up failed: ${error.message}`,
    }
  }
}
