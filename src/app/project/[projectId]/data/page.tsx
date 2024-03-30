"use client";
import {
  SubNav,
  ListFolder,
  NoneFolder,
  ModalNewFolder,
  ModalCreateFolder,
  ModalUpload,
  DetailFolder,
  ModalDeleteFolder,
  NoneData,
} from "@/app/components";
import React, { ReactNode, useEffect, useState } from "react";
import {
  createFolder,
  getFolder,
  deleteFolder,
  updateFolder,
  GetFolderCanMove,
} from "@/service/project/folderService";

import { FileUpload } from "@/service/project/fileService";

import { env } from "@/config/varenv";
let Folder = () => {
  // local variable:

  let token = env.TOKEN;

  let project_id = localStorage.getItem("project_id");

  let parent_id: any = localStorage.getItem("parent_id");

  let type = localStorage.getItem("type");

  let folder_id_local = localStorage.getItem("folder_id");

  const [data, setData] = useState<any[]>([]);

  const [dataCanMove, setDataCanMove] = useState<any[]>([]);

  const [parentId, set_parent_id] = useState<any>(0); // Store folder parent's id

  const [folder_id, set_folder_id] = useState<any>(0); // Store folder's id

  const [nameFolder, setNameFolder] = useState(""); // Store folder's name

  const [newOpen, setNewOpen] = useState(false); // Btn Open setting

  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false); //open modal create Folder

  const [isUploadFile, setIsUploadFile] = useState(false); // Modal upload file /folder

  const [file, setFile] = useState<undefined | File | any>(); // File

  // show right bar

  const [showOption, setShowOption] = useState(false); // Show Folder Detail

  const [showEdit, setShowEdit] = useState(false); // Edit Folder name

  const [showDeleteFolder, setShowDeleteFolder] = useState(false); // Show Delete Modal

  const [showMoveFolder, setShowMoveFolder] = useState(false);

  const handleHideOption = () => {
    setShowOption(false);
    setShowEdit(false);
    setShowMoveFolder(false);
  };

  const [clickCount, setClickCount] = useState(0);

  const handleToogleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleBack = () => {
    setShowEdit(false);
    setShowMoveFolder(false);
  };

  const handleNewOpen = () => {
    setNewOpen(!newOpen);
  };

  useEffect(() => {
    let timeout: any;
    if (clickCount === 1) {
      timeout = setTimeout(() => {
        setShowOption(true);
        setClickCount(0);
      }, 300);
    } else if (clickCount === 2) {
      getFolderData();
      for (let folder of data) {
        if (folder.id == folder_id) {
          localStorage.setItem("parent_id", folder.id);
          set_parent_id(folder.id);
        }
      }
      setClickCount(0);
    }
    return () => clearTimeout(timeout);
  }, [clickCount]);

  const handleClick = (e: React.MouseEvent) => {
    let currValue: any = (e.currentTarget.closest(".hoverList") as HTMLElement)
      ?.id;
    let name_folder: any =
      e.currentTarget?.querySelector(".nameFol")?.textContent;
    localStorage.setItem("folder_id", currValue);
    localStorage.setItem("name_folder", name_folder);
    setNameFolder(name_folder);
    set_folder_id(currValue);

    for (let folder of data) {
      if (folder.id === parseInt(currValue)) {
        localStorage.setItem("parent_id", folder.parent_id);
      }

      if (typeof folder.versions === "number") {
        localStorage.setItem("type", "file");
      } else if (typeof folder.versions === "undefined") {
        localStorage.setItem("type", "folder");
      }
    }

    setClickCount((prevCount) => prevCount + 1);
  }; // Function Get folder's id, name

  //....................GET folders..............................//

  const getFolderData = async () => {
    const res = await getFolder(token, project_id, folder_id);

    const foldersAndFiles = [...res.folders, ...res.files];

    setData(foldersAndFiles);
  };

  useEffect(() => {
    getFolderData();
  }, []);

  //......................POST folder..............................//
  const [dataFolder, setDataFolder] = useState({
    name: "",
    parent_id: `${parent_id}`,
    project_id: project_id,
  });

  const handleCreateFolder = async () => {
    try {
      const response = await createFolder(dataFolder, token);
      setData((prev: any) => [...prev, response]);
      setIsOpenCreateFolder(false);
    } catch (error) {
      console.error("Lỗi khi tạo Folder mới:", error);
    }
  };

  //.........................DELETE Folder...........................//

  const handleDeleteFolder = async () => {
    await deleteFolder(token, folder_id, project_id);
    const indexToRemove = data.findIndex(
      (item: any) => item.id === parseInt(folder_id)
    );

    if (indexToRemove !== -1) {
      data.splice(indexToRemove, 1);
    }
    setShowDeleteFolder(false);
    setShowOption(false);
  };

  //.........................UPDATE Folder...........................//

  const [folderEdit, setFolderEdit] = useState({
    name: "",
    project_id: project_id,
    parent_id: parent_id,
  });

  const handleChangeFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setNameFolder(currValue);
    setFolderEdit({ ...folderEdit, [name]: value });
  };

  const handleUpdateFolder = async () => {
    const response = await updateFolder(token, folderEdit, folder_id);

    let newNameFolder = {
      name: response.name,
      id: response.id,
    };

    const indexToRemove = data.findIndex(
      (item: any) => item.id === parseInt(folder_id)
    );

    data.splice(indexToRemove, 1, newNameFolder);
    setShowEdit(!showEdit);
    setShowOption(false);
  };

  //....................UploadFile......................//

  function handleOnChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await FileUpload(token, formData);
    setIsUploadFile(!isUploadFile);
  }

  //....................................................//

  //.......................Get all folder can move.......................//

  const handleGetFolderCanMove = () => {
    GetFolderCanMove(token, type, folder_id_local, parent_id, project_id).then(
      (res: any) => {
        setDataCanMove(res.data.metadata);
        // console.log();
      }
    );
  };

  //.........................Move Folder to another Folder..........................//

  let parent_id_to_move = localStorage.getItem("parent_id_to_move");
  let name_folder_local = localStorage.getItem("name_folder");
  const [dataMoveFolder, setDataMoveFolder] = useState({
    name: name_folder_local,
    project_id: project_id,
    parent_id: parent_id_to_move,
  });

  const handleClickFolderToMove = (e: React.MouseEvent) => {
    let currValue: any = (e.currentTarget.closest(".itemFolder") as HTMLElement)
      ?.id;
    localStorage.setItem("parent_id_to_move", currValue);
  };

  const handleMoveFolder = async () => {
    const response = await updateFolder(token, dataMoveFolder, folder_id_local);
    console.log(response);
  };

  let NoneComponent: ReactNode;

  if (data.length === 0 && parentId === 0) {
    NoneComponent = (
      <NoneFolder
        openCreateFolder={() => {
          setIsOpenCreateFolder(!isOpenCreateFolder);
          setNewOpen(false);
        }}
      />
    );
  } else if (data.length === 0 && parentId != 0) {
    NoneComponent = <NoneData />;
  }

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
                setNewOpen(false);
              }}
            />
          ) : null}
        </div>

        {data === undefined || data.length === 0 ? (
          NoneComponent
        ) : (
          <div className="container showFolder">
            <ListFolder
              titleName="Tên"
              user="Người tạo"
              timeCreate="Ngày tạo"
              size="Ngày sửa đổi"
              statusTodo="Tags"
              eventClick={handleClick}
              folders={data}
            />
          </div>
        )}
      </div>

      {showOption && (
        <DetailFolder
          showEdit={showEdit}
          handleBack={handleBack}
          nameFolder={nameFolder}
          handleToogleEdit={handleToogleEdit}
          handleHideOption={handleHideOption}
          showModalDelete={() => setShowDeleteFolder(true)}
          saveBtn={handleUpdateFolder}
          handleChange={handleChangeFolder}
          value={nameFolder}
          handleShowMoveFolder={() => {
            handleGetFolderCanMove();
            setShowMoveFolder(true);
          }}
          folders={dataCanMove}
          handleClickMove={handleMoveFolder}
          showMoveFolder={showMoveFolder}
          getIdFolerToMove={handleClickFolderToMove}
        />
      )}

      {showDeleteFolder && (
        <ModalDeleteFolder
          handleClose={() => setShowDeleteFolder(false)}
          handleDeleteFolder={handleDeleteFolder}
        />
      )}

      {isOpenCreateFolder == true ? (
        <ModalCreateFolder
          closeModal={() => setIsOpenCreateFolder(!isOpenCreateFolder)}
          handleInputName={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDataFolder({ ...dataFolder, name: e.target.value })
          }
          createFolder={handleCreateFolder}
        />
      ) : null}

      {isUploadFile == true ? (
        <ModalUpload
          eventClose={() => {
            setIsUploadFile(!isUploadFile);
          }}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />
      ) : null}
    </>
  );
};

export default Folder;
