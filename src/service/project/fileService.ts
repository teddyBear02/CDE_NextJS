import { env } from "@/config/varenv";
import axios from "axios";

//.......................Upload file....................................//
export const  FileUpload =  (token : any, formData:any) =>{
    
    axios
        .post(`${env.BASE_URL}/api/files`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("File uploaded successfully!");
            return response
        })
        .catch((error) => {
            // Xử lý lỗi
            console.log("Error uploading file: ", error);
        });
  
}

//...............................Update File..............................//
export const FileUpdate = (token:any,id:any, data:any) =>{
    axios
        .put(`${env.BASE_URL}/api/files/${id}`,data, {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("File update successfully!");
            return response
        })
        .catch((error) => {
            // Xử lý lỗi
            console.log("Error uploading file: ", error);
        });

}

//.............................. Download File ...................................//

export const DownloadFile = (token:any,id:any) =>{
    axios
        .get(`${env.BASE_URL}/api/files/download/${id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        .catch((error)=>{
            console.log(error)
        })
}

//................................History file .....................................//

export const GetHistoryFile = (token:any,fisrt_version:any) =>{
    return axios
        .get(`${env.BASE_URL}/api/files/history/${fisrt_version}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        .then((response:any)=>{
            return response.data
        })

        .catch((error)=>{
            console.log(error)
        })
}