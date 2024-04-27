import React from "react";

interface Props {
  nameFolder: any;
  handleToogleEdit: any;
  handleHideOption: any;
  showModalDelete: any;
  showMoveFolder: any;
  isActive: any;
  cancelCmt: any;
  createCmt: any;
  showCmt: any;
  onChangeComment: any;
  downloadFile: any;
  clickShowHistory: any;
}

function inforFolder({
  nameFolder,
  handleToogleEdit,
  handleHideOption,
  showModalDelete,
  showMoveFolder,
  isActive,
  cancelCmt,
  createCmt,
  showCmt,
  onChangeComment,
  downloadFile,
  clickShowHistory,
}: Props) {
  return (
    <>
      <div className="header">
        <h4>{nameFolder}</h4>
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
                <button className="btn mr-1" onClick={downloadFile}>
                  <i className="bi bi-download"></i>
                </button>
                <button className="btn mr-1" onClick={showMoveFolder}>
                  <i className="bi bi-folder-symlink"></i>
                </button>
                <button className="btn mr-1" onClick={showModalDelete}>
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
                  <a className="pointer" onClick={clickShowHistory}>
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
      <footer className="p-0 footerInfoFol" id="">
        {isActive ? (
          <div className="comments">
            <div className="add-comment-section active">
              <div id="add-comment-wrapper" className="px-2">
                <div id="comment-container" className="comment-support"></div>
                <div className="relative">
                  <textarea
                    id="comment-add"
                    className="comment-add"
                    placeholder="Add a comment..."
                    maxLength={1024}
                    name="content"
                    onChange={onChangeComment}
                  ></textarea>
                  <div className="line"></div>
                </div>
                <ul className="list mb-1" id="attachment-list"></ul>
              </div>
              <div className="row-distribute px-2 py-2">
                <div className="d-flex">
                  <button
                    className="button link-secondary"
                    id="cancelCmt"
                    onClick={cancelCmt}
                  >
                    Hủy
                  </button>
                  <button
                    className="button bg-primary text-light ms-2"
                    id="createCmt"
                    onClick={createCmt}
                  >
                    Bình luận
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="comments" onClick={showCmt}>
            <div className="add-comment-section inactive">
              <i className="bi bi-chat-right-dots-fill"></i>
              <textarea
                name=""
                id="comment-add"
                className="comment-add mt-1"
                placeholder="Thêm bình luận..."
              ></textarea>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}

export default inforFolder;
