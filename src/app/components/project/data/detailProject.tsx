interface Props {
  showEdit: any;
  handleToogleEdit: any;
  handleHideOption: any;
}
let DetailProject = ({
  showEdit,
  handleToogleEdit,
  handleHideOption,
}: Props) => {
  return (
    <>
      <div id="right">
        {showEdit ? (
          <>
            <div className="header">
              <button className="btn" onClick={handleToogleEdit}>
                <i className="bi bi-arrow-left"></i>
              </button>
              <div>
                <h3>Edit</h3>
              </div>
              <button className="btn exit" onClick={handleHideOption}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <section className="">
              <div className="panel-body">
                <form action="#">
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Tên dự án</label>
                      <div className="input-focus-group">
                        <input type="text" name="" id="" />
                      </div>
                    </div>
                  </div>
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Tên tags </label>
                      <div className="input-focus-group">
                        <input type="text" name="" id="" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <footer className="editFooter">
              <div className="wrap-btns">
                <button
                  className="editBtns"
                  id="editCancel"
                  onClick={handleToogleEdit}
                >
                  Hủy
                </button>
                <button className="editBtns" id="editSave" disabled>
                  Lưu
                </button>
              </div>
            </footer>
          </>
        ) : (
          <>
            <div className="header">
              <h4>My house</h4>
              <button className="btn" id="edit" onClick={handleToogleEdit}>
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button className="btn exit" id="" onClick={handleHideOption}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <section className="mb-0">
              <div className="body">
                <div className="sub-section preview icon">
                  <i className="bi bi-folder-fill"></i>
                </div>
                <div className="sub-section pl-2 mt-1">
                  <div className="d-flex mw-100">
                    <div className="d-flex">
                      <button className="btn mr-1">
                        <i className="bi bi-person-gear"></i>
                      </button>
                      <button className="btn mr-1">
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn mr-1">
                        <i className="bi bi-folder-symlink"></i>
                      </button>
                      <button className="btn mr-1">
                        <i className="bi bi-trash"></i>
                      </button>
                      <div className="mr-1">
                        <button className="btn">
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sub-section">
                  <div className="section-header">
                    <h5>Details</h5>
                  </div>
                  <div className="section-details">
                    <div className="label-group">
                      <label htmlFor="">Version</label>
                      <div className="value">
                        <span>1</span>
                        <a href="#" className="pointer">
                          See history
                        </a>
                      </div>
                    </div>
                    <div className="label-group">
                      <label htmlFor="">Size</label>
                      <div className="value">1,71Kb</div>
                    </div>
                    <div className="label-group">
                      <label htmlFor="">Ngày tạo</label>
                      <div className="value">...</div>
                    </div>
                    <div className="label-group">
                      <label htmlFor="">Chỉnh sửa</label>
                      <div className="value">...</div>
                    </div>
                  </div>
                </div>
                <div className="sub-section">
                  <div className="section-header group">
                    <h5>Quyền truy cập</h5>
                    <button className="btn">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </div>
                  <div className="section-details">
                    <div className="label-group">
                      <label htmlFor="">Quyền truy cập thành viên dự án</label>
                      <div className="value mb-1">Toàn quyền truy cập</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="p-0">
              <div className="comments"></div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default DetailProject;
