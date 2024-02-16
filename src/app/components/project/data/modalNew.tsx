interface Props {
  eventCreateFolder?: any;
  eventUpLoadFile?: any;
}

let ModalNew = ({ eventCreateFolder, eventUpLoadFile }: Props) => {
  return (
    <>
      <div className="dropdown-pane">
        <ul className="dropdown-list">
          <li onClick={eventCreateFolder}>
            <i className="bi bi-folder-plus"></i> Tạo thư mục
          </li>
          <li>
            <i className="bi bi-box"></i> Tạo mô hình 3D
          </li>
          <hr />
          <li onClick={eventUpLoadFile}>
            <i className="bi bi-file-earmark-plus"></i> Upload files
          </li>
        </ul>
      </div>
    </>
  );
};

export default ModalNew;
