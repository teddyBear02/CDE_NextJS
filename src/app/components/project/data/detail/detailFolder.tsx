import { MoveFolder, EditFolder, InforFolder } from "@/app/components";
import { ReactElement } from "react";

interface Props {
  showEdit: any;
  handleToogleEdit: any;
  handleHideOption: any;
  showModalDelete: any;
  nameFolder: any;
  saveBtn: any;
  handleChange: any;
  value: string;
  handleClickMove?: any;
  handleShowMoveFolder: any;
  showMoveFolder: any;
  handleBack: any;
  folders: any;
  getIdFolerToMove: any;
}
let DetailFolder = ({
  showEdit,
  showMoveFolder,
  handleToogleEdit,
  handleHideOption,
  showModalDelete,
  nameFolder,
  saveBtn,
  handleChange,
  value,
  handleClickMove,
  handleShowMoveFolder,
  handleBack,
  folders,
  getIdFolerToMove,
}: Props) => {
  return (
    <>
      <div className="right">
        {showEdit ? (
          <EditFolder
            handleChange={handleChange}
            handleHideOption={handleHideOption}
            handleBack={handleBack}
            value={value}
            saveBtn={saveBtn}
          />
        ) : showMoveFolder ? (
          <MoveFolder
            handleClickMove={handleClickMove}
            handleHideOption={handleHideOption}
            handleToogleEdit={handleBack}
            getIdFolerToMove={getIdFolerToMove}
            folders={folders}
          />
        ) : (
          <InforFolder
            showMoveFolder={handleShowMoveFolder}
            nameFolder={nameFolder}
            handleToogleEdit={handleToogleEdit}
            handleHideOption={handleHideOption}
            showModalDelete={showModalDelete}
          />
        )}
      </div>
    </>
  );
};

export default DetailFolder;
