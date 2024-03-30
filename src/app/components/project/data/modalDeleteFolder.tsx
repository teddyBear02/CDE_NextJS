interface Props {
  handleClose: any;
  handleDeleteFolder: any;
}

const ModelDeleteFolder = ({ handleClose, handleDeleteFolder }: Props) => {
  return (
    <>
      <div className={`modalEditTags`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Xóa thư mục</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <div className="mt-2">
              <p>Bạn có muốn xóa thư mục này không ?</p>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleDeleteFolder}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelDeleteFolder;
