import { env } from "@/config/varenv";

export const createFolder = async (formData: FormData,token:any) => {
    try {
      const formDataObject: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value.toString();
      });
  
      const {nameFolder} = formDataObject;
      const response = await fetch(`${env.BASE_URL}/api/folder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nameFolder }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Lỗi không tới được điểm cuối:", error);
    }
  };