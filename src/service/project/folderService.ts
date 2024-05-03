import { env } from "@/config/varenv";
import axios from "axios";

//.....................POST Folder..............................//

export const createFolder = async (data: any,token:any) => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/folder`, {
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
        console.error("Failed:", errorData);
      }
    } catch (error) {
      console.error("Lỗi không tới được điểm cuối:", error);
    }
  };


//.......................GET Folder..............................//

export const getFolder = async(token:any,project_id:any,folder_id:any) =>{
  try {
    const res = await fetch(`${env.BASE_URL}/api/folder/${project_id}/${folder_id}`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if(res.ok){
      const data = await res.json()

      return data.metadata
    }else{
      const errorMess = await res.json()
      console.error(errorMess);
    }
  } catch (error) {
    console.log(error)
  }
}

//.....................DELETE Folder..............................//

export const deleteFolder = async (token:any, folder_id:any, project_id:any) =>{
  try {
    const res = await fetch(`${env.BASE_URL}/api/folder/${folder_id}/${project_id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if(res.ok){
      const data = await res.json()
      return data.metadata
    }else{
      const errorMess = await res.json()
      console.error(errorMess);
    }
  } catch (error) {
    console.log(error)
  }
}

//.....................UPDATE Folder..............................//

export const updateFolder = async (token:any, data:any, folder_id:any,option:any) =>{
  try {
    const res = await fetch(`${env.BASE_URL}/api/folder/${folder_id}/${option}`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    if(res.ok){
      const data = await res.json()
      return data.metadata
    }else{
      const errorMess = await res.json()
      console.error(errorMess);
    }
  } catch (error) {
    console.log(error)
  }
}


//.........................Move Folder....................................//

export const GetFolderCanMove = (token:any, type:any, folder_id:any, parent_id:any,project_id:any) =>{
  return axios
    .get(`${env.BASE_URL}/api/folder?type=${type}
          &folder_id=${folder_id}&parent_id=${parent_id}&project_id=${project_id}`,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    })

    .catch((error) =>{
      console.log(error);
    })
}