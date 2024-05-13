import React from "react";

interface Props {
  handleBack: any;
  handleHideOption: any;
  handleChange: any;
  value: any;
  saveBtn: any;
  tags: any;
  tagLenghtVal: any;
  changeNameTag: any;
  display: any;
  searchResult: any;
  choseTag: any;
  rejectTag: any;
}

function EditFolder({
  handleHideOption,
  handleBack,
  handleChange,
  value,
  saveBtn,
  tags,
  tagLenghtVal,
  changeNameTag,
  display,
  searchResult,
  choseTag,
  rejectTag,
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
                <div className="group-items input-focus-group">
                  <ul>
                    {tags?.map((tag: any, index: any) => (
                      <li className="chips" key={index} id={`${tag.id}`}>
                        <span>{tag.name}</span>
                        <div className="btn-delete-tag" onClick={rejectTag}>
                          <i className="bi bi-x-lg"></i>
                        </div>
                      </li>
                    ))}

                    <li>
                      <input
                        type="text"
                        name=""
                        id="tag-input"
                        placeholder="Tìm kiếm tag..."
                        maxLength={30}
                        ref={tagLenghtVal}
                        onChange={changeNameTag}
                      />
                      {
                        <div className={`auto-complete te-top-fix ${display}`}>
                          <ul className="mw-100">
                            {searchResult?.length > 0 ? (
                              searchResult?.map((item: any, index: any) => (
                                <li
                                  className="search-result"
                                  key={index}
                                  onClick={choseTag}
                                  id={`${item.id}`}
                                >
                                  <div className="select-menu-item">
                                    {item.name}
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="none-result">
                                Không tìm thấy kết quả
                              </li>
                            )}
                          </ul>
                        </div>
                      }
                    </li>
                  </ul>
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
