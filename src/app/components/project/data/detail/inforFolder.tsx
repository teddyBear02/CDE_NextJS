import React from "react";
import { formatDate } from "@/app/until/Helper";

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
  data: any;
  isEditComment: any;
  dropdownRef: any;
  toggleDropdown: any;
  listComment: any;
  btnDropRef: any;
  handleShowModalComment: any;
  isOpenEditComment: any;
  handleShowEditCmt: any;
  handleSaveEditCmt: any;
  onChangeInputComment: any;
  handleCancelEdit: any;
  valueComment: any;
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
  data,
  isEditComment,
  dropdownRef,
  toggleDropdown,
  listComment,
  btnDropRef,
  handleShowModalComment,
  isOpenEditComment,
  handleShowEditCmt,
  handleSaveEditCmt,
  onChangeInputComment,
  handleCancelEdit,

  valueComment,
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
          {/* Hiển thị các tags */}
          {data.length > 0 ? (
            <div className="sub-section">
              <div className="section-header">
                <h5>Tags</h5>
              </div>
              <div className="section-detail">
                <ul className="flex-grow-wrap">
                  {data?.map((tag: any, index: any) => (
                    <li className="chips non-editable" key={index}>
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}

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
          {/* Hiển thị các comments */}
          {listComment.length > 0 ? (
            <div className="sub-section">
              <div className="section-header">
                <h5>Comment</h5>
              </div>

              <div className="setion-detail comment-list">
                <ul className="list">
                  {listComment.map((item: any, index: any) => (
                    <li
                      className="list-item px-3"
                      key={index}
                      id={`${item.id}`}
                    >
                      <div className="group-items px-0">
                        <div className="mr-1 avatar small">
                          <img
                            src="data:application/json;base64,eyJtZXNzYWdlIjoiRG93bmxvYWQgRmFpbGVkIiwiZXJyb3Jjb2RlIjoiRE9XTkxPQURfRkFJTEVEIn0="
                            className=""
                          />
                        </div>
                        <div className="block">
                          <div className="text-ellipsis">
                            <a className="link-secondary">{item.user.email}</a>
                          </div>
                          <div className="text-ellipsis">
                            <small className="text-meta">
                              {formatDate(item.created_at)}
                            </small>
                          </div>
                        </div>
                        <div
                          className="dropdown-pane-container connect-dropdown-menu m-width-0"
                          ref={dropdownRef}
                        >
                          <button
                            className="dropdownpane-link button icon-medium tertiary icon-cirlce"
                            title="More options"
                            data-cy="ddMenuIcon"
                            onClick={toggleDropdown}
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>

                          <div
                            className={`dropdown-pane w-auto ${
                              isEditComment === item.id
                                ? `active-edit-comment`
                                : ``
                            }`}
                            ref={btnDropRef}
                          >
                            <ul className="dropdown-list">
                              <li
                                value="Edit"
                                data-cy="Edit"
                                onClick={handleShowEditCmt}
                              >
                                Edit
                              </li>
                              <li
                                value="Delete"
                                data-cy="Delete"
                                onClick={handleShowModalComment}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="content">{item.content}</p>

                        <div
                          className={`edit-comment ${
                            isOpenEditComment === item.id
                              ? `is-active-comment`
                              : ``
                          }`}
                        >
                          <textarea
                            name=""
                            id=""
                            onChange={onChangeInputComment}
                            value={valueComment}
                          ></textarea>
                          <div className="btns-group">
                            <button
                              onClick={handleCancelEdit}
                              className="cancelEditComment"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveEditCmt}
                              className="saveEditComment"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
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
