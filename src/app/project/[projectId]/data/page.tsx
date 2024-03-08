"use client";
import {
  SubNav,
  ListFolder,
  NoneFolder,
  ModalNewFolder, 
  ModalCreateFolder,
  ModalUpload,
  DetailProject,
} from "@/app/components";
import { useState } from "react";
import Folders from "@/test/testData";
import { createFolder } from "@/service/folderService";

let Folder = () => {
  let dataFolder: any = Folders;
  let token = "token";
  const [newOpen, setNewOpen] = useState(false);
  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleHideOption = () => {
    setShowOption(false);
    setShowEdit(false);
  };

  const handleShowOption = () => {
    setShowOption(true);
  };
  const handleToogleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleNewOpen = () => {
    setNewOpen(!newOpen);
  };

  const handleCreateFolder = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const res = await createFolder(formData, token);
      console.log(formData);
    } catch (error) {
      console.error("Lỗi khi tạo Folder mới:", error);
    }
  };

  return (
    <>
      <div className="container showFolder">
        <div>
          <SubNav titleNav="Thư mục" btnTitle="Tạo mới" event={handleNewOpen} />
          {newOpen == true ? (
            <ModalNewFolder
              eventCreateFolder={() => {
                setIsOpenCreateFolder(!isOpenCreateFolder);
                setNewOpen(false);
              }}
              eventUpLoadFile={() => {
                setIsUploadFile(!isUploadFile);
                setNewOpen(false);}}
            />
          ) : null}
        </div>

        {dataFolder !== undefined ? (
          <div className="container showFolder">
            <ListFolder
              titleName="Tên"
              user="Người sửa đổi"
              timeCreate="Sửa đổi"
              size="Kích thước"
              statusTodo="Tags"
              eventClick={handleShowOption}
              data={dataFolder}
            />
          </div>
        ) : (
          <NoneFolder
            openCreateFolder={() => {
              setIsOpenCreateFolder(!isOpenCreateFolder);
              setNewOpen(false);
            }}
          />
        )}
      </div>

      {showOption && (
        <DetailProject
          showEdit={showEdit}
          handleToogleEdit={handleToogleEdit}
          handleHideOption={handleHideOption}
        />
      )}

      {isOpenCreateFolder == true ? (
        <ModalCreateFolder
          closeModal={() => setIsOpenCreateFolder(!isOpenCreateFolder)}
          createFolder={handleCreateFolder}
        />
      ) : null}

      {isUploadFile == true ? (
        <ModalUpload
          eventClose={() => {
            setIsUploadFile(!isUploadFile);
          }}
          token={token}
        />
      ) : null}
    </>
  );
};

export default Folder;
