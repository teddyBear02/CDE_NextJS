import { env } from "@/config/varenv";

export const getActivities = async(token:any,project_id:any,params:string) =>{
    try {
        const response:any = await fetch(`${env.BASE_URL}/api/activities?project_id=${project_id}${params}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        })

        if(response.ok){
            return response.json()
        }else{
            return response
        }
    } catch (error) {
        console.log(`Đã có lỗi sảy ra: ${error}`);
    }
} 

export const getUserActivities = async(token:any,project_id:any) =>{
    try {
        const response:any = await fetch(`${env.BASE_URL}/api/activities/${project_id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        })

        if(response.ok){
            return response.json()
        }else{
            return response
        }
    } catch (error) {
        console.log(`Đã có lỗi sảy ra: ${error}`);
    }
}