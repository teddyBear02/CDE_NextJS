import { env } from "@/config/varenv";

const googleRegister = async () => {
  try {
    const response = await fetch(`${env.BASE_URL}/google/redirect`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

export default googleRegister;
