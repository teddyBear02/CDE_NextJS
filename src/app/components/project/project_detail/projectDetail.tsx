interface Props {
  delete_project: any;
  out_project: any;
  data_project: any;
}

export default function ProjectDetail({
  delete_project,
  out_project,
  data_project,
}: Props) {
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
      <div className="container">
        <div className="row g-5">
          {/* Left */}
          <div className="col ">
            <div id="detailProject">
              <h3>Tổng quan</h3>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Tên dự án
                  </label>
                  <input
                    type="text"
                    name=""
                    id="inpNameProjectDetail"
                    value={data_project.name}
                  />
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
          </div>

          {/* Right */}
          <div className="col">
            <div id="settingProject" className="mb-4">
              <h3>Cài đặt dự án</h3>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Ngày bắt đầu
                  </label>
                  <input type="text" name="" id="inpNameProjectDetail" />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Ngày kết thúc {"(Dự kiến)"}
                  </label>
                  <input type="text" name="" id="inpNameProjectDetail" />
                </div>
                <div className="col-12">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Mô tả dự án
                  </label>
                  <textarea name="" id=""></textarea>
                </div>
                <div className="col-12"></div>
              </div>
            </div>
            <hr />
            <div id="btnsProjectDetail">
              <button
                className="btnDetailProject"
                id="leave"
                onClick={out_project}
              >
                Rời dự án
              </button>
              <button
                className="btnDetailProject"
                id="delete"
                onClick={delete_project}
              >
                Xóa dự án
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
