import { env } from "@/config/varenv";
import axios from "axios";

export const PostComment = (token:any,data:any) =>{
    axios
        .post(`${env.BASE_URL}/api/comment`,data,{
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