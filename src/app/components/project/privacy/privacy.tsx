import SubNav from "../../common/subNav";

export default function Privacy() {
  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Quyền truy cập" btnTitle="Lưu thay đổi" />
        <div className="container showFolder">
          <div className="boxPermission mb-4" id="todoVisual">
            <div className="headerPermisson">{"Hiển thị việc cần làm"}</div>
            <div className="row">
              <div className="col">
                <p>Chọn cách mà người dùng có thể thấy việc cần làm</p>
              </div>
              <div className="col">
                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name=""
                      id=""
                      className="custom-input"
                    />
                  </div>
                  <label htmlFor="">
                    {"Hiển thị việc cần làm (Mặc định)"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị toàn bộ với những người trong dự
                      án
                    </p>
                  </label>
                </div>

                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name=""
                      id=""
                      className="custom-input"
                    />
                  </div>
                  <label htmlFor="">
                    {"Hiển thị việc cần làm (Mặc định)"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị toàn bộ với những người trong dự
                      án
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="boxPermission" id="projectIvitations">
            <div className="headerPermisson">{"Mời thành viên dự án"}</div>
            <div className="row">
              <div className="col">
                <p>Chọn người có thể mời người khác vào dự án</p>
              </div>
              <div className="col">
                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name=""
                      id=""
                      className="custom-input"
                    />
                  </div>
                  <label htmlFor="">
                    {"Hiển thị việc cần làm (Mặc định)"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị toàn bộ với những người trong dự
                      án
                    </p>
                  </label>
                </div>

                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name=""
                      id=""
                      className="custom-input"
                    />
                  </div>
                  <label htmlFor="">
                    {"Hiển thị việc cần làm (Mặc định)"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị toàn bộ với những người trong dự
                      án
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
