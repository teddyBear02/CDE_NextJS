import { env } from "@/config/varenv";
import axios from "axios";

const projectService = {
  //....................GET project......................//
  async getProject(token: any) {
    try{
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
      }
    }catch(error){
      console.error("Không lay mới được dữ liệu:", error);
    }
      
  },

  //...................POST project......................//
  async handleCreateProject(data: any, token: any) {
    try {
      const formData = new FormData();
      formData.append("finish_date", data.finish_date);
      formData.append("thumbnails", data.thumbnails);
      formData.append("name", data.name);
      formData.append("start_date", data.start_date);
      formData.append("note", data.note);

      
      const response = await fetch(`${env.BASE_URL}/api/project`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData
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


  //...................DELETE project......................//
  async handleDeleteProject (token:any, project_id:any){
    try {
      const response = await fetch(`${env.BASE_URL}/api/project/${project_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  async getInforProject(token:any,project_id:any){
    try {
      const response =await fetch(`${env.BASE_URL}/api/project/${project_id}`,{
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.ok) {
        const data = await response.json();
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Get project failed:", errorData);
      }
    } catch (error) {
      console.log(error)
    }
      
  }

};

export default projectService;
