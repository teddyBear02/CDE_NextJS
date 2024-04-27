interface Props {
  handleBack: any;
  handleHideOption: any;
  saveBtn: any;
}

const EditTodo = ({ handleBack, handleHideOption, saveBtn }: Props) => {
  return (
    <>
      <div className="header">
        <button className="btn" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <h3>Chỉnh sửa</h3>

        <button className="btn exit" onClick={handleHideOption}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <section className="">
        <div className="panel-body">
          <form action="#">
            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Tiêu đề</label>
                <div className="input-focus-group">
                  <input
                    type="text"
                    name="name"
                    // onChange={handleChange}
                    // value={value}
                  />
                </div>
              </div>
            </div>
            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Miêu tả </label>
                <div className="input-focus-group">
                  <textarea name="" id=""></textarea>
                </div>
              </div>
            </div>

            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Tới ngày </label>
                <div className="input-focus-group">
                  <input type="date" />
                </div>
              </div>
            </div>

            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Trạng thái </label>
                <div className="input-focus-group">
                  <select name="" id="" value={1}>
                    <option value="1">Mới</option>
                    <option value="2">Đang làm</option>
                    <option value="3">Đang đợi</option>
                    <option value="4">Hoàn thành</option>
                    <option value="5">Bị đóng</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Ưu tiên </label>
                <div className="input-focus-group">
                  <select name="" id="" value={4}>
                    <option value="1">Cấp thiết</option>
                    <option value="2">Cao</option>
                    <option value="3">Bình thường</option>
                    <option value="4">Thấp</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sub-section">
              <div className="input-group">
                <label htmlFor="">Thẻ</label>
                <div className="input-focus-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Thẻ"
                    // onChange={handleChange}
                    // value={value}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer className="editFooter">
        <div className="wrap-btns">
          <button className="editBtns" id="editCancel" onClick={handleBack}>
            Hủy
          </button>
          <button className="editBtns" id="editSave" onClick={saveBtn}>
            Lưu
          </button>
        </div>
      </footer>
    </>
  );
};

export default EditTodo;
