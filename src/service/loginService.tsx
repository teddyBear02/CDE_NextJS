"use server";
import { env } from "@/config/varenv";

export const login = async (formData: FormData) => {
  try {
    const formDataObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });

    const { email, password } = formDataObject;
    const response = await fetch(`${env.BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
