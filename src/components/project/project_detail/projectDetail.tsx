interface Props {
  delete_project: any;
  out_project: any;
  data_project?: any;
}

export default function ProjectDetail({
  delete_project,
  out_project,
  data_project,
}: Props) {
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
                    <p>{data_project.created_at.slice(0, 10)}</p>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Sửa đổi cuối cùng
                  </label>
                  <div>
                    <p>{data_project.updated_at.slice(0, 10)}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Hoạt động
                    </label>
                    <p>{data_project.number_activities}</p>
                  </div>
                  <div className="col">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Folders
                    </label>
                    <p>{data_project.number_folders}</p>
                  </div>
                  <div className="col">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Files
                    </label>
                    <p>{data_project.number_files}</p>
                  </div>
                  <div className="col">
                    <label htmlFor="" className="titleName-ProjectDetail">
                      Người dùng
                    </label>
                    <p>{data_project.number_users}</p>
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
                  <input
                    type="date"
                    name=""
                    id="inpNameProjectDetail"
                    value={data_project.start_date.slice(0, 10)}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="titleName-ProjectDetail">
                    Ngày kết thúc {"(Dự kiến)"}
                  </label>
                  <input
                    type="date"
                    name=""
                    id="inpNameProjectDetail"
                    value={data_project.finish_date.slice(0, 10)}
                  />
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
