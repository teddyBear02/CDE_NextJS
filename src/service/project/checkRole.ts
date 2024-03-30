import { env } from "@/config/varenv";

const CheckRole = async (token:any,project_id:any) =>{
    try {
        const response = await fetch(
          `${env.BASE_URL}/api/checkRole/${project_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          return data.metadata;
        } else {
          const errorData = await response.json();
          console.error("Failed:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
}

export default CheckRole