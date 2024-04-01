import {
  MoveFolder,
  EditFolder,
  InforFolder,
  HistoryFile,
} from "@/app/components";

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
  isActive: any;
  cancelCmt: any;
  createCmt: any;
  showCmt: any;
  onChangeComment: any;
  downloadFile: any;
  showHistory: any;
  clickShowHistory: any;
  dataHistory: any;
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
  isActive,
  cancelCmt,
  createCmt,
  showCmt,
  onChangeComment,
  downloadFile,
  showHistory,
  clickShowHistory,
  dataHistory,
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
        ) : showHistory ? (
          <HistoryFile
            data={dataHistory}
            handleBack={handleBack}
            handleHideOption={handleHideOption}
          />
        ) : (
          <InforFolder
            showMoveFolder={handleShowMoveFolder}
            nameFolder={nameFolder}
            handleToogleEdit={handleToogleEdit}
            handleHideOption={handleHideOption}
            showModalDelete={showModalDelete}
            isActive={isActive}
            cancelCmt={cancelCmt}
            createCmt={createCmt}
            showCmt={showCmt}
            onChangeComment={onChangeComment}
            downloadFile={downloadFile}
            clickShowHistory={clickShowHistory}
          />
        )}
      </div>
    </>
  );
};

export default DetailFolder;
