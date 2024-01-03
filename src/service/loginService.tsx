const loginService = {
  async login(data: any) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Login successful", data);
        localStorage.setItem("userData", data.metadata.token);
        return data;
        // Thực hiện các hành động sau khi đăng nhập thành công (chuyển hướng, lưu token, v.v.).
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Thông tin đăng nhập không chính xác");
        // Xử lý lỗi (hiển thị thông báo lỗi, v.v.).
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  },
};

export default loginService;
