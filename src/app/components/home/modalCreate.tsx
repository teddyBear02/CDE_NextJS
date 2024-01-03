interface Props {
  showModal: any;
  handleClose: any;
  handleInputChange: any;
  handleCreateProject: any;
}
let ModalCreate = ({
  showModal,
  handleClose,
  handleCreateProject,
  handleInputChange,
}: Props) => {
  return (
    <>
      <div className={`modalNew ${showModal ? "show" : ""}`}>
        <div id="boxModal">
          <div id="titleModal">
            <h2>
              Dự án mới <i className="bi bi-x-lg" onClick={handleClose}></i>
            </h2>
            <p id="des">Điền những thông tin của dự án:</p>
          </div>

          <form id="detail">
            <label>Tên dự án:</label>

            <input
              type="text"
              placeholder="Tên dự án"
              name="ProjectName"
              onChange={handleInputChange}
            />

            <label>Ngày bắt đầu:</label>
            <input type="date" onChange={handleInputChange} name="StartDate" />

            <label>Ngày kết thúc:</label>
            <input type="date" onChange={handleInputChange} name="FinishDate" />
          </form>
          <div id="modalBtn">
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
