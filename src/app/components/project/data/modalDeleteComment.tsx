interface Props {
  handleClose: any;
  handleDeleteComment: any;
}

const ModelDeleteComment = ({ handleClose, handleDeleteComment }: Props) => {
  return (
    <>
      <div className={`modalEditTags`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Xóa bình luận</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <div className="mt-2">
              <p>Bạn có muốn xóa bình luận này không ?</p>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleDeleteComment}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelDeleteComment;
