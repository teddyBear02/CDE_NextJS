interface Props {
  handleClose: any;
  handleDeleteProject: any;
}

const ModalDeleteProject = ({ handleClose, handleDeleteProject }: Props) => {
  return (
    <>
      <div className={`modalEditTags`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Xóa dự án</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <div className="mt-2">
              <p>
                Việc xóa dự án này sẽ xóa dự án, bạn và những thành viên trong
                dự án này. <strong>Hành động này không thể hoàn tác.</strong>
                Bạn không thể khôi phục lại dự án này
              </p>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleDeleteProject}>
                Xóa dự án
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteProject;
