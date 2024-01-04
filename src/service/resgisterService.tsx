import { env } from "@/config/varenv";

const resgisterService = {
  async handleRegister(data: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  },
};

export default resgisterService;
