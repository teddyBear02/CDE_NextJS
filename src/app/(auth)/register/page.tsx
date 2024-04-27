"use client";
import resgisterService from "@/service/auth/resgisterService";
import googleRegister from "@/service/auth/ggResgister";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function resgister() {
    try {
      const data = await resgisterService.handleRegister(formData);
      if (data) {
        router.back();
        alert("Đăng kí thành công !!!");
      } else {
        alert("Đăng kí không thành công");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  async function googleRegis() {
    const data = await googleRegister();
    console.log(data);
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
                name="phone"
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
                <i className="bi bi-google" onClick={googleRegis}></i>
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
