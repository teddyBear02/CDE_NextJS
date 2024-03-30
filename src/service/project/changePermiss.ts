import { env } from "@/config/varenv";
import axios from "axios";

export const ChangePermiss = (token:any,project_id:any,data:any) =>{
    axios
        .put(`${env.BASE_URL}/api/project/changePermiss/${project_id}`,(data),{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        .catch((error) =>{
            console.log(error);
            
        })
}