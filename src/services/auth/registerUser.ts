"use server"

export const registerUser = async (_currentState: any, formData: FormData): Promise<any> => {
    const username = formData.get("username")
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, name, email, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};