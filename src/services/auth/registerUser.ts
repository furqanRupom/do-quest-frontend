"use server"

import { registerValidationZodSchema } from "@/zod/auth.validation";


export const registerUser = async (_currentState: any, formData: FormData): Promise<any> => {

    const registerData = {
        username: formData.get("username"),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    }
    const validateFields = registerValidationZodSchema.safeParse(registerData)
    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message,
            }))
        }
    }
    const {confirmPassword, ...requestData} = registerData  

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};