const resgisterService = {
  async handleRegister(data: any) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Registration successful:", data);
        return data;
        // Thực hiện các hành động sau khi đăng ký thành công (chuyển hướng, hiển thị thông báo, v.v.).
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        // Xử lý lỗi (hiển thị thông báo lỗi, v.v.).
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },
};

export default resgisterService;
