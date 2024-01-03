import { NavBar, SubNav } from "../components";

export default function Profile() {
  const propsSubNav = {
    titleNav: "Hồ sơ cá nhân",
    disabel: false,
    btnTitle: "Lưu",
  };
  return (
    <>
      <div className="main">
        <NavBar />
        <div className="container-fluid toRender">
          <div className="container-md" id="flow-y">
            <SubNav params={propsSubNav} />
            <div className="container text-center">
              <div className="row">
                <div className="col">
                  <div className="container text-center">
                    {/* Thông tin cơ bản - Begin*/}
                    <div className="row mb-4" id="basicIf">
                      <h4>Thông tin cơ bản</h4>

                      <div className="imgUser">
                        <img src="" alt="" />
                      </div>

                      <div className="infor">
                        <div className="half mb-4">
                          <label htmlFor="">Tên (bắt buộc):</label>
                          <br />
                          <input type="text" name="" id="" />
                        </div>

                        <div className="half mb-4">
                          <label htmlFor="">Họ (bắt buộc):</label>
                          <br />
                          <input type="text" name="" id="" />
                        </div>

                        <div className="emailUser">
                          <div id="left50">
                            <label htmlFor="">Địa chỉ Email:</label>
                            <br />
                            <p className="e-mail">abc.@gmail.com</p>
                          </div>
                        </div>

                        <div id="changePass">
                          <p>
                            <span>Thay đổi mật khẩu</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Thông tin cơ bản - End*/}

                    {/* Thông tin liên hệ */}
                    <div className="row mb-4">
                      <div id="contactInfo">
                        <h4>Thông tin liên hệ </h4>
                        <div className="half mb-4">
                          <div>
                            <label htmlFor="">Số điện thoại công ty:</label>
                            <br />
                            <input type="text" name="" id="" />
                          </div>
                        </div>

                        <div className="half mb-4">
                          <label htmlFor="">Số điện thoại di động:</label>
                          <br />
                          <input type="text" name="" id="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right board */}
                <div className="col">
                  <div className="row container mb-4" id="bg-w">
                    <h4>Lựa chọn khác</h4>
                    <div className=" mb-4">
                      <label htmlFor="">Ngôn ngữ:</label>
                      <br />
                      <input type="text" name="" id="" />
                    </div>
                    <div className=" mb-4">
                      <label htmlFor="">Chức vụ:</label>
                      <br />
                      <input type="text" name="" id="" />
                    </div>
                    <div className=" mb-4">
                      <label htmlFor="">Công việc:</label>
                      <br />
                      <input type="text" name="" id="" />
                    </div>
                    <div className=" mb-4">
                      <label htmlFor="">Công ty:</label>
                      <br />
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
