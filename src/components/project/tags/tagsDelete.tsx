interface Props {
  showModal: any;
  handleClose: any;
  handleEditTags: any;
}

let TagsDelete = ({ showModal, handleClose, handleEditTags }: Props) => {
  return (
    <>
      <div className={`modalEditTags ${showModal ? "showModalEditTags" : ""}`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Xóa thẻ</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <div className="mt-2">
              <p>Bạn có muốn xóa thẻ này ?</p>
              <p>
                Việc xóa thẻ này sẽ làm cho nó không còn ở trong bất kì công
                việc nào trong dự án.{" "}
                <strong>Hành động này không thể hoàn tác</strong>
              </p>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleEditTags}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagsDelete;
