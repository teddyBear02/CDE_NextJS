import React from "react";

interface Props {
  handleBack: any;
  handleHideOption: any;
  handleChange: any;
  value: any;
  saveBtn: any;
}

function EditFolder({
  handleHideOption,
  handleBack,
  handleChange,
  value,
  saveBtn,
}: Props) {
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
                <label htmlFor="">Tên dự án</label>
                <div className="input-focus-group">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={value}
                  />
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
}

export default EditFolder;
