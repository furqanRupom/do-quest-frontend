"use server"

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
  const usernameOrEmail = formData.get("usernameOrEmail") as string;
  const password = formData.get("password") as string;

  try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    
    if (!response.ok) {
      console.log(response);
      
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};