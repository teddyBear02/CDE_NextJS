"use client";
import resgisterService from "@/service/resgisterService";

import { useState } from "react";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    NumberPhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function resgister() {
    try {
      const data = await resgisterService.handleRegister(formData);
      console.log(data);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  return (
    <>
      <div className="bgImg">
        <div id="wrapValid">
          <h2>Đăng kí</h2>
          <div id="validation">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder=""
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInput">Tên người dùng</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingPassword"
                placeholder="Email"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <label htmlFor="floatingPassword">Nhập email của bạn</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingPassword">Nhập mật khẩu</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-control"
                id="floatingPassword"
                maxLength={12}
                placeholder="Số điện thoại"
                name="NumberPhone"
                value={formData.NumberPhone}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingPassword">Nhập số điện thoại</label>
            </div>

            <div id="btnValid" className="mb-4">
              <button
                className="btn btn-primary p-4 pt-2 pb-2"
                onClick={resgister}
              >
                Đăng kí
              </button>
            </div>

            <div id="otherValid">
              <p>Bạn có thể đăng kí qua:</p>
              <div id="icon">
                <i className="bi bi-google"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-github"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
