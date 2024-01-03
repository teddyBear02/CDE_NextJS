"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import loginService from "@/service/loginService";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  async function login() {
    try {
      const userData = await loginService.login(formData);
      if (userData) {
        router.push("/home");
      } else {
        alert("Thông tin chưa chính xác !!!");
      }
      console.log(userData);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  return (
    <>
      <div className="bgImg">
        <div className="formLog">
          <h3>Đăng nhập</h3>
          <div className="form-floating mb-3" id="">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleInputChange}
            />
            <label form="floatingInput">Tên đăng nhập</label>
          </div>
          <div className="form-floating" id="">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
            />
            <label form="floatingPassword">Mật khẩu</label>
          </div>

          <div className="d-flex justify-content-between">
            <p>
              <Link href={"/register"} className="link-opacity-100">
                Đăng kí nhanh
              </Link>
            </p>
            <p>
              <Link href={"/forgot"} className="link-opacity-100">
                Quên mật khẩu
              </Link>
            </p>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto" id="btn-log">
            <button type="button" className="btn btn-primary" onClick={login}>
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
