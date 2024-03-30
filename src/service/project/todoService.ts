import { env } from "@/config/varenv";


export const getTodo = async (token:any) => {
    const response : any = await fetch(`${env.BASE_URL}/api/todo`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    )

    if(response.ok){
        const data = await response.json()
        return data.metadata
    }else{
        console.log(response);   
    }
}

export const PostTodo = async (token:any, data:any)=>{
    const response = await fetch(`${env.BASE_URL}/api/todo`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }
    )

    if(response.ok){
        const data = await response.json();
        return data.metadata;
    }else{
        console.log(response);
    }
}