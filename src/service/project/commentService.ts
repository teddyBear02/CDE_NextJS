import { env } from "@/config/varenv";
import axios from "axios";

export const PostComment = (token:any,data:any,project_id:string|number) =>{
    axios
        .post(`${env.BASE_URL}/api/comment/${project_id}`,data,{
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