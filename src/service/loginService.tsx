import { env } from "@/config/varenv";

const loginService = {
  async login(data: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userData", data.metadata.token);
        console.log(data.metadata);
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  },
};

export default loginService;
