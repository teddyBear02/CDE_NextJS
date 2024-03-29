"use client";
import Link from "next/link";
import { login } from "@/service/loginService";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
let Login = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data !== undefined) {
        localStorage.setItem("Token", data?.metadata?.token);
        router.push("/home");
      }
    },
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      mutation.mutate(formData);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <div className="bgImg">
        <div className="formLog">
          <h3>Đăng nhập</h3>
          <form onSubmit={handleFormSubmit} method="POST">
            <div className="form-floating mb-3" id="">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
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
              <button type="submit" className="btn btn-primary">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
