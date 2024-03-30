import { env } from "@/config/varenv";
import axios from "axios";

//...................Get information Teams............................//

export const getInforTeam = (token:any , project_id:any) =>{
    return axios 
            .get(`${env.BASE_URL}/api/teams/${project_id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error)=> 
                console.log(error)
            )
}

//.........................Send Email..................................//


export const SendMail = (token:any, dataUser:any) =>{
    axios
        .post(`${env.BASE_URL}/api/teams/sendEmail`,dataUser,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        .then(
            (response) =>{
                return response
            }
        )
        .catch((error) => {
            console.log(error)
        })
}

//.........................Change Role................................//

export const ChangRole = (token:any, project_id:any, user_id:any, role:any) =>{
    axios
        .put(`${env.BASE_URL}/api/teams/changeRole/${project_id}/${user_id}/${role}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        .catch((error)=>{
            console.log(error);
        })
}

//...........................Delete User From Project.....................//

export const DeleteUser = (token:any,project_id:any,user_id:any) => {
    axios
        .delete(`${env.BASE_URL}/api/teams/${project_id}/${user_id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }, 
        })

        .catch((error)=>{
            console.log(error);
        })
}


//..........................Change Role User................................//

export const ChangeRole = (token:any, project_id:any, user_id:any,role:any) =>{
    axios
        .put(`${env.BASE_URL}/api/teams/changeRole/${project_id}/${user_id}/${role}`,'',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }, 
        })

        .catch((error)=>{
            console.log(error)
        })
}