interface Props {
  showModal: any;
  handleClose: any;
  handleEditTags: any;
  handleChangeNewTag: any;
  value: string;
  inpRef?: any;
}

export default function TagsEdit({
  showModal,
  handleClose,
  handleEditTags,
  handleChangeNewTag,
  value,
}: Props) {
  return (
    <>
      <div className={`modalEditTags ${showModal ? "showModalEditTags" : ""}`}>
        <div id="modelEditTags">
          <div className="headerModalTags row">
            <div className="col">
              <h4 className="">Chỉnh sửa thẻ</h4>
            </div>
            <div className="col-2 exitModalEditTags" onClick={handleClose}>
              <i className="bi bi-x-lg "></i>
            </div>
          </div>

          <div className="middleModalTags">
            <label htmlFor="">
              <span>Tên thẻ (Phải có)</span>
            </label>
            <div>
              <input
                type="text"
                name="TagName"
                onChange={handleChangeNewTag}
                value={value}
              />
              <div></div>
            </div>
          </div>

          <div className="footerModelTags">
            <hr />
            <div className="btnsTagEdit">
              <button className="cancelTagsBtn" onClick={handleClose}>
                Hủy
              </button>
              <button className="editTagsBtn" onClick={handleEditTags}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
