import { env } from "@/config/varenv";

const projectService = {
  //....................GET project......................//
  async getProject(token: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/project`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        if (response.ok) {
          const data = await response.json();
          return data.metadata;
        } else {
          const errorData = await response.json();
          console.error("Thêm thẻ mới thất bại:", errorData);
        }
      } else {
        console.error(
          "Loại phản hồi không mong đợi. Mong đợi JSON, nhưng nhận được:",
          contentType
        );
      }
    } catch (error) {
      console.error("Không lấy được dữ liệu:", error);
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
