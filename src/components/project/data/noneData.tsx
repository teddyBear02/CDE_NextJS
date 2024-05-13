let NoneData = () => {
  return (
    <>
      <div className="mt-5">
        <div className="empty ">
          <div className="empty-icon">
            <i className="bi bi-folder-fill icon-font"></i>
          </div>
          <div className="empty-text">
            <h3 className="text-muted">This folder is empty</h3>
            <p className="small text-muted"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoneData;
