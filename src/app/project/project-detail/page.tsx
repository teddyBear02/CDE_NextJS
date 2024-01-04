import { SubNav } from "@/app/components";

export default function ProjectDetail() {
  let dateCreate = "Sep 14, 2023 10:14 PM";
  let userCreate = "nva@gmail.com";
  let lastModifile = "Dec 29, 2023 08:05 PM";
  let userLastModifile = "nvb@gmail.com";
  let sizeProject = "35 KB";
  let totalFolder = 5;
  let totalFiles = 13;
  let totalUsers = 6;
  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Thông tin dự án" btnTitle="Lưu thay đổi" />
        <div className="container">
          <div className="row g-5">
            <div className="col ">
              <div id="detailProject">
                <h3>Tổng quan</h3>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Tên dự án
                    </label>
                    <input type="text" name="" id="inpNameProjectDetail" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Quyền sở hữu dự án
                    </label>
                    <div>
                      <p>Trimble Connect for Free | TRMB</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Giấy phép dự án
                    </label>
                    <div>
                      <p>Trimble Connect Internal Trial | TBP-CONN-FREEMIUM</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Ảnh đại diện dự án
                    </label>
                    <div>
                      <img src="" alt="" />
                      <div>{"Upload new"}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Ngày tạo
                    </label>
                    <div>
                      <p>
                        {dateCreate} by {userCreate}
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Sửa đổi cuối cùng
                    </label>
                    <div>
                      <p>
                        {lastModifile} by {userLastModifile}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="" className="titleName-ProjectDetail">
                        Kích thước
                      </label>
                      <p>{sizeProject}</p>
                    </div>
                    <div className="col">
                      <label htmlFor="" className="titleName-ProjectDetail">
                        Folder
                      </label>
                      <p>{totalFolder}</p>
                    </div>
                    <div className="col">
                      <label htmlFor="" className="titleName-ProjectDetail">
                        Files
                      </label>
                      <p>{totalFiles}</p>
                    </div>
                    <div className="col">
                      <label htmlFor="" className="titleName-ProjectDetail">
                        Người dùng
                      </label>
                      <p>{totalUsers}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="settingProject">
                <h3>Cài đặt dự án</h3>
                <div className="row">
                  <div className="col"></div>
                  <div className="col"></div>
                </div>
                <textarea name="" id=""></textarea>
              </div>
            </div>

            <div className="col">
              <div id="mapProject">
                <h3>Vị trí dự án</h3>
              </div>

              <div id="btnsProjectDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
