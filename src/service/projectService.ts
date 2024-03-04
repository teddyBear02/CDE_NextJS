import { env } from "@/config/varenv";

const projectService = {
  //....................GET project......................//
  async getProject(token: any) {
    
      const response = await fetch(`${env.BASE_URL}/api/project`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.log(errorData);
        // console.error("Lấy dữ liệu  thất bại:", errorData);
      }
  },

  //...................POST project......................//
  async handleCreateProject(data: any, token: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Add new project successful:", data.metadata);
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Add new project failed:", errorData);
      }
    } catch (error) {
      console.error("Không tạo mới được dữ liệu:", error);
    }
  },
};

export default projectService;
