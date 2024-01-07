let None = () => {
  return (
    <>
      <div className="container showFolder">
        <h3>Drag & drop to this folder or create</h3>
        <div className="row mt-5">
          <div className="col">
            <div className="noneFolderHover">
              <i className="bi bi-folder-plus fs-2 "></i>
              <h5>Tạo thư mục mới</h5>
              <p>Nhóm các dữ liệu và quyền truy cập</p>
            </div>
          </div>

          <div className="col">
            <div className="noneFolderHover">
              <i className="bi bi-arrow-repeat fs-2 "></i>
              <h5>Tải về và đồng bộ</h5>
              <p>Đồng bộ dự án từ máy tính của bạn</p>
            </div>
          </div>

          <div className="col">
            <div className="noneFolderHover">
              <i className="bi bi-map fs-2 "></i>
              <h5>Sơ đồ làm việc </h5>
              <p>Quản lý dữ liệu GIS của bạn </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default None;
