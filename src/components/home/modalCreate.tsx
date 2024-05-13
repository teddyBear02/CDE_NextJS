interface Props {
  showModal: any;
  handleClose: any;
  handleInputChangeName: any;
  handleInputChangeStart: any;
  handleInputChangeEnd: any;
  handleCreateProject: any;
  handleChangeNote: any;
  handleChangeThumbnail?: any;
  handleUpload: any;
  inputImgRef: any;
}
let ModalCreate = ({
  showModal,
  handleClose,
  handleCreateProject,
  handleInputChangeName,
  handleInputChangeStart,
  handleInputChangeEnd,
  handleChangeNote,
  handleChangeThumbnail,
  handleUpload,
  inputImgRef,
}: Props) => {
  return (
    <>
      <div className={`modalNew ${showModal ? "show" : ""}`}>
        <div id="boxModal">
          <div id="titleModal">
            <h2>
              Dự án mới <i className="bi bi-x-lg" onClick={handleClose}></i>
            </h2>
          </div>

          <div className="scroll-section null">
            <p className="mb-1">
              <span>Điền những thông tin của dự án:</span>
            </p>
            <div className="input-group">
              <label htmlFor="name">
                <span>Name</span>
              </label>
              <div className="input-focus-group">
                <input
                  id="name"
                  data-cy="name"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleInputChangeName}
                />
                <div className="line"></div>
              </div>
            </div>
            <div className="relative">
              <div className="flex-row align-items-center">
                <div className="label-group">
                  <label>Project thumbnail</label>
                  <div className="value ">
                    <div className="project-img-settings">
                      <img
                        src="https://web.connect.trimble.com/assets/img/file_60.svg"
                        className="thumbnail micro"
                      />
                    </div>
                  </div>
                </div>
                <div className="label-group fileUploadButton">
                  <label></label>
                  <div>
                    <button
                      className="button link-primary"
                      type="button"
                      onClick={handleUpload}
                    >
                      Upload new
                    </button>
                    <input
                      ref={inputImgRef}
                      id="image"
                      name="thumbnails"
                      type="file"
                      accept="image/* "
                      onChange={handleChangeThumbnail}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="description">
                <span>Description</span>
              </label>
              <div className="input-focus-group">
                <textarea
                  id="description"
                  className=""
                  data-cy="description"
                  name="note"
                  onChange={handleChangeNote}
                ></textarea>
                <div className="line"></div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="startDate">
                <span>Start date</span>
              </label>
              <div className="react-datepicker-wrapper">
                <div className="react-datepicker__input-container">
                  <input
                    type="date"
                    id="startDate"
                    name="start_date"
                    className=""
                    onChange={handleInputChangeStart}
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="endDate">
                <span>End date</span>
              </label>
              <div className="react-datepicker-wrapper">
                <div className="react-datepicker__input-container">
                  <input
                    type="date"
                    id="endDate"
                    name="finish_date"
                    className=""
                    onChange={handleInputChangeEnd}
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="modalBtn">
            <hr />
            <button
              className="btn btn-primary btns"
              id="cancel"
              onClick={handleClose}
            >
              Hủy
            </button>
            <button
              className="btn btn-primary btns"
              onClick={handleCreateProject}
              id="created"
            >
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreate;
