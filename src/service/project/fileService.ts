import { env } from "@/config/varenv";
import axios from "axios";

export const  FileUpload = async (token : any, formData:any) =>{
    
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