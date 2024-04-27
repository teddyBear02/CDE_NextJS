interface Props {
  handleHideOption: any;
  handleToogleEdit: any;
  isActive: any;
  onChangeComment: any;
  cancelCmt: any;
  createCmt: any;
  showCmt: any;
}

const InfoTodo = ({
  handleHideOption,
  handleToogleEdit,
  isActive,
  onChangeComment,
  cancelCmt,
  createCmt,
  showCmt,
}: Props) => {
  return (
    <>
      <div className="header">
        <h4>Name todo</h4>
        <button className="btn" id="edit" onClick={handleToogleEdit}>
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button className="btn exit" id="" onClick={handleHideOption}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <section className="mb-0">
        <div className="panel-body">
          <div
            className="sub-secion d-flex px-3 mt-2"
            id="single-views-actions"
          >
            <div className="dropdown-pane-container ">
              <button className="button dropdown default exportBtn">
                Export<i className="icon-font tc-icon-arrow-drop-down "></i>
              </button>
              <div
                id="todo-drop-down-pane"
                className="dropdown-pane w-auto left "
              >
                {/* <ul className="dropdown-list" >
                    <li id="todo-export-bcf">Export to BCF</li>
                    <li id="todo-export-excel">Export to Excel</li>
                  </ul> */}
              </div>
            </div>
            <span className="mx-2">
              <button
                className="button icon-medium tertiary icon-circle "
                type="button"
                data-cy="icon-button"
              >
                <i className="bi bi-tag-fill"></i>
              </button>
            </span>
            <button
              className="button icon-medium tertiary icon-circle "
              type="button"
              data-cy="icon-button"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
            <div className="dropdown-pane-container connect-dropdown-menu m-width-0">
              <button
                className="dropdownpane-link button icon-medium tertiary icon-cirlce"
                data-cy="ddMenuIcon"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>
          <div className="sub-section">
            <div className="section-header">
              <h5>Details</h5>
            </div>
            <div className="section-details">
              <div className="label-group">
                <label>Description</label>
                <div className="value no-ellipsis text-prewrap">haha</div>
              </div>
              <div className="label-group">
                <label>Due date: </label>
                <div className="value ">--</div>
              </div>
              <div className="label-group">
                <label>Type</label>
                <div className="value ">--</div>
              </div>
              <div className="label-group">
                <label>Priority</label>
                <div className="value ">
                  <i className="icon-font i16 tc-icon-circle normal"></i>
                  Normal
                </div>
              </div>
              <div className="label-group">
                <label>Status</label>
                <div className="value ">New</div>
              </div>
              <div className="label-group">
                <label>Completion %</label>
                <div className="value ">--</div>
              </div>
              <div className="label-group">
                <label>Assigned To</label>
                <div className="value">
                  {/* <ul className="flex-row-wrap">--</ul> */}
                  <div className="value ">--</div>
                </div>
              </div>
              <div className="label-group">
                <label>Created</label>
                <div className="value ">
                  Mar 30, 2024 By Nguyễn Thị Yến Nhi 0136 gmail.com
                </div>
              </div>
              <div className="label-group">
                <label>Modified</label>
                <div className="value ">
                  Mar 30, 2024 By Nguyễn Thị Yến Nhi 0136 gmail.com
                </div>
              </div>
            </div>
          </div>
          <div className="sub-section">
            <div className="section-header group pad-right-todo">
              <h5>Attachments</h5>
              <div className="flex-row">
                <button
                  className="button icon-medium tertiary icon-circle"
                  type="button"
                  data-cy="icon-button"
                >
                  <i className="icon-font bi bi-plus"></i>
                </button>
              </div>
            </div>
            <p className="text-muted px-2">
              This ToDo doesn't have any attachments.
            </p>
          </div>
        </div>
      </section>

      <footer className="p-0 footerInfoFol">
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
};

export default InfoTodo;
