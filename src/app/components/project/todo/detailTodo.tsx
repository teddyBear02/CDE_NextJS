interface Props {
  handleToogleEdit?: any;
  handleHideOption: any;
}

const DetailTodo = ({ handleHideOption, handleToogleEdit }: Props) => {
  return (
    <>
      <div className="right">
        <div className="header">
          <h4></h4>
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
              className="sub-secion d-flex px-2 mt-1"
              id="single-views-actions"
            >
              <span className="mx-1">
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
                    <ul className="flex-row-wrap">--</ul>
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
                    className="button icon-medium tertiary icon-circle "
                    type="button"
                    data-cy="icon-button"
                  >
                    <i className="icon-font  tc-icon-content-add"></i>
                  </button>
                </div>
              </div>
              <p className="text-muted px-2">
                This ToDo doesn't have any attachments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailTodo;
