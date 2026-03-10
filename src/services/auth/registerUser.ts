"use server"

import z from "zod";

const registerValidationZodSchema = z.object({
    name: z.string().min(5,"Name is required and must be at least 5 characters long").max(50, "Name must be at most 50 characters long"),
    username: z.string().min(5, "Username is required and must be at least 5 characters long").max(10, "Username must be at most 10 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.email("Email is required and must be a valid email address"),
    password: z.string().min(8, "Password is required and must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().min(8, "Confirm Password is required and must be at least 8 characters long")
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});
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