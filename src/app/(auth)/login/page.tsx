import Link from "next/link";

export default function Login() {
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
            <Link href={"/home"}>
              <button type="button" className={`btn btn-primary`}>
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
