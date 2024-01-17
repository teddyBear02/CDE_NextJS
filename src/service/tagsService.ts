import { env } from "@/config/varenv";

const tagSevice = {
  //............................... GET tag......................................//

  async getTags(token: any, id: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/tag/showAll/${id}`, {
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
        console.error("Add new tag failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },

  //.............................. POST tag......................................//

  async handleAdd(data: any, token: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Add new tag failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },

  //..............................................................................//

  //................................. UPDATE tag..................................//

  async handleEditTags(data: any, token: any, id: any, idProject: any) {
    try {
      const response = await fetch(
        `${env.BASE_URL}/api/tag/${id}/${idProject}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Không thành công");
      }
      const responseData = await response.json();
      return responseData.metadata;
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu PUT:", error);
    }
  },

  //..............................................................................//

  //.................................. DELETE tag.................................//

  async handleDeleteTag(data: any, token: any, id: any) {
    try {
      const response = await fetch(`${env.BASE_URL}/api/tag/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
      });

      if (!response.ok) {
        throw new Error("Không thành công");
      }
      // Xử lý dữ liệu phản hồi (nếu cần)
      const responseData = await response.json();
      console.log("Dữ liệu phản hồi:", responseData);
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu PUT:", error);
    }
  },
};

export default tagSevice;
