import React from "react";

interface Props {
  handleToogleEdit: any;
  handleHideOption: any;
  handleClickMove: any;
  folders?: any;
  getIdFolerToMove: any;
  goIntoFolder: any;
  activeItem: any;
}

function MoveFolder({
  handleToogleEdit,
  handleHideOption,
  handleClickMove,
  folders,
  getIdFolerToMove,
  goIntoFolder,
  activeItem,
}: Props) {
  return (
    <>
      <div className="header">
        <button className="btn" onClick={handleToogleEdit}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <h3>Di chuyển tới...</h3>

        <button className="btn exit" onClick={handleHideOption}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <section className="middleMoveFolder">
        <div className="panel-body">
          <ul className="list nav">
            <li className="list-item group border-bottom">
              <div className="group-items project-name px-0 ">
                <h5 className="block pl-2">My house in future</h5>
              </div>
            </li>
          </ul>

          <ul className="list nav">
            {folders.map((folder: any, index: any) => (
              <div className={`itemFolder`} key={index}>
                <li
                  className={`list-item group selectable ${
                    activeItem === folder.id ? `hover-move` : ``
                  }`}
                  id={`${folder.id}`}
                  onClick={getIdFolerToMove}
                >
                  <div className="group-items" id={`${folder.id}`}>
                    <i className="bi bi-folder-fill folder-ic"></i>
                    <span className="block">{folder.name}</span>
                    <button
                      className="button icon-circle icon-medium tertiary"
                      aria-label="open folder"
                      onClick={goIntoFolder}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </section>
      <footer className="editFooter">
        <div className="wrap-btns">
          <button className="editBtns" id="editSave" onClick={handleClickMove}>
            Chuyển tới đây
          </button>
        </div>
      </footer>
    </>
  );
}

export default MoveFolder;
