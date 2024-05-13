interface Props {
  handleClose: any;
  handleQuitProject: any;
}

const ModalQuitProject = ({ handleClose, handleQuitProject }: Props) => {
  return (
    <>
      <div className={`modalEditTags`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Rời dự án</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <div className="mt-2">
              <p>Bạn có muốn rời dự án này ?</p>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleQuitProject}>
                Rời đi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalQuitProject;
