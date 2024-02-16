let ModalNewFolder = () => {
  let nameProject = "My futuer house";
  return (
    <>
      <div id="modalCreateFolder">
        <div id="boxModal">
          <div id="header">
            <h3>Tạo thư mục trong '{nameProject}'</h3>
            <button>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div id="content">
            <p>Hãy điền tên cho thư mục</p>
            <div className="input">
              <label htmlFor="">Tên</label>
              <input type="text" name="" id="" />
            </div>
            <div className="line"></div>
          </div>

          <div id="footer">
            <div>
              <button>Hủy</button>
              <button>Tạo mới</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalNewFolder;
