import { env } from "@/config/varenv";
import axios from "axios";


export const GetComment = ( token:string,type: string | number, folder_id: string | number) =>{
    return axios
        .get(`${env.BASE_URL}/api/comment/${type}/${folder_id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })


        .catch((error)=>{
            console.log(error);
        })
}

export const PostComment = (token:any, data:any, project_id:any) =>{
    return axios
        .post(`${env.BASE_URL}/api/comment/${project_id}`,data,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        .catch((error)=>{
            console.log(error);
        })
}

export const DeleteComment = (id: string | number, project_id: string | number, token:string) =>{
    axios
        .delete(`${env.BASE_URL}/api/comment/${id}/${project_id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        .then((res:any)=>{
            console.log(res.data)
        })

        .catch((error)=>{
            console.log(error);
        })
}


export const UpdateComment = (id: string | number, project_id: string | number, token:string, data:any) =>{
    return axios
        .put(`${env.BASE_URL}/api/comment/${id}/${project_id}`,data,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        .catch((error)=>{
            console.log(error);
        })
}