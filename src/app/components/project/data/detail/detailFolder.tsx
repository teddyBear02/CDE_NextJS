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
  tags: any;
  tagLenghtVal: any;
  changNameTag: any;
  display: any;
  searchResult: any;
  choseTag: any;
  rejectTag: any;
  goIntoFolder: any;
  actveItem: any;
  dataTag: any;
  isEditComment: any;
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
  tags,
  tagLenghtVal,
  changNameTag,
  display,
  searchResult,
  choseTag,
  rejectTag,
  goIntoFolder,
  actveItem,
  dataTag,
  isEditComment,
}: Props) => {
  return (
    <>
      <div className="right">
        {showEdit ? (
          <EditFolder
            changeNameTag={changNameTag}
            handleChange={handleChange}
            handleHideOption={handleHideOption}
            handleBack={handleBack}
            value={value}
            saveBtn={saveBtn}
            tags={tags}
            tagLenghtVal={tagLenghtVal}
            display={display}
            searchResult={searchResult}
            choseTag={choseTag}
            rejectTag={rejectTag}
          />
        ) : showMoveFolder ? (
          <MoveFolder
            handleClickMove={handleClickMove}
            handleHideOption={handleHideOption}
            handleToogleEdit={handleBack}
            getIdFolerToMove={getIdFolerToMove}
            folders={folders}
            goIntoFolder={goIntoFolder}
            activeItem={actveItem}
          />
        ) : showHistory ? (
          <HistoryFile
            data={dataHistory}
            handleBack={handleBack}
            handleHideOption={handleHideOption}
          />
        ) : (
          <InforFolder
            data={dataTag}
            isEditComment={isEditComment}
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
