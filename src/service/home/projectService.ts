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

  getInforProject(token:any,project_id:any){
    return axios
      .get(`${env.BASE_URL}/api/project/${project_id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      .catch((error)=>{
        console.log(error);
      })
  }

};

export default projectService;
