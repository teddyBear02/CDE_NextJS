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

import tagService from "@/service/project/tagsService";

import {
  FileUpload,
  FileUpdate,
  DownloadFile,
  GetHistoryFile,
} from "@/service/project/fileService";

import { PostComment } from "@/service/project/commentService";

import { env } from "@/config/varenv";

let Folder = () => {
  // local variable:

  let token = env.TOKEN;

  let project_id: any = localStorage.getItem("project_id");

  let parent_id: any = localStorage.getItem("parent_id");

  let type = localStorage.getItem("type");

  let folder_id_local: any = localStorage.getItem("folder_id");

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

  const [showHistory, setShowHistory] = useState(false);

  // comment state:

  const [showComment, setShowComment] = useState(false);

  const handleHideOption = () => {
    setShowOption(false);
    setShowEdit(false);
    setShowMoveFolder(false);
    setShowHistory(false);
  };

  const [clickCount, setClickCount] = useState(0);

  const handleToogleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleBack = () => {
    setShowEdit(false);
    setShowMoveFolder(false);
    setShowHistory(false);
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

    if (e.currentTarget.classList.contains("folder")) {
      localStorage.setItem("type", "folder");
      localStorage.setItem("type-num", "0");
    } else {
      localStorage.setItem("type", "file");
      localStorage.setItem("type-num", "1");
    }

    for (let folder of data) {
      if (folder.versions >= 1) {
        localStorage.setItem("parent_id", folder.folder_id);
        localStorage.setItem("first-version", folder.first_version);
      } else if (folder.id === parseInt(currValue)) {
        localStorage.setItem("parent_id", folder.parent_id);
      }
    }

    setClickCount((prevCount) => prevCount + 1);
  }; // Function Get folder's id, name

  //....................GET folders..............................//

  const [tags, setTags] = useState<any[]>([]);

  const getFolderData = async () => {
    const res = await getFolder(token, project_id, folder_id);
    const tagRes = await tagService.getTags(token, project_id);

    const foldersAndFiles = [...res.folders, ...res.files];

    setTags(tagRes);
    setData(foldersAndFiles);
  };

  useEffect(() => {
    getFolderData();
  }, []);

  //......................POST folder..............................//
  const [dataFolder, setDataFolder] = useState({
    name: "",
    parent_id: folder_id_local,
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

  const [fileEdit, setFileEdit] = useState({
    name: "",
    project_id: project_id,
    folder_id: parent_id,
  });

  const handleChangeFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setNameFolder(currValue);
    setFolderEdit({ ...folderEdit, [name]: value });
    setFileEdit({ ...fileEdit, name: e.target.value });
  };

  const handleUpdateFolder = async () => {
    if (type === "file") {
      FileUpdate(token, folder_id_local, fileEdit);
    } else {
      await updateFolder(token, folderEdit, folder_id);
    }
    // location.reload();
  };

  //....................UploadFile......................//

  function handleOnChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder_id", folder_id_local);
    formData.append("project_id", project_id);

    await FileUpload(token, formData);
    setIsUploadFile(!isUploadFile);
    // location.reload();
  }

  //......................Update File...........................//

  const handleUpdateFile = () => {
    FileUpdate(token, folder_id_local, data);
  };

  //.......................Get all folder can move.......................//

  const handleGetFolderCanMove = () => {
    GetFolderCanMove(token, type, folder_id_local, parent_id, project_id).then(
      (res: any) => {
        setDataCanMove(res.data.metadata);
      }
    );
  };

  //.........................Move Folder/File to another Folder..........................//

  let parent_id_to_move: any = localStorage.getItem("parent_id_to_move");
  let name_folder_local: any = localStorage.getItem("name_folder");

  const [dataMoveFolder, setDataMoveFolder] = useState({
    name: name_folder_local,
    project_id: project_id,
    parent_id: parent_id_to_move,
  });

  const [dataMoveFile, setDataMoveFile] = useState({
    name: name_folder_local,
    project_id: project_id,
    folder_id: parent_id_to_move,
  });

  const handleClickFolderToMove = (e: React.MouseEvent) => {
    let currValue: any = (e.currentTarget.closest(".itemFolder") as HTMLElement)
      ?.id;
    localStorage.setItem("parent_id_to_move", currValue);
  };

  const handleMoveFolder = async () => {
    if (type === "file") {
      const response = FileUpdate(token, folder_id_local, dataMoveFile);
      // location.reload();
      console.log(response);
    } else {
      const response = await updateFolder(
        token,
        dataMoveFolder,
        folder_id_local
      );
      // location.reload();

      console.log(response);
    }
  };

  //...........................Post comment...............................//

  let type_num: any = localStorage.getItem("type-num");

  const [comment, setComment] = useState({
    type: type_num,
    another_id: folder_id_local,
    content: "",
  });

  const HandlePostComment = () => {
    PostComment(token, comment);
  };

  //............................. Get History File .............................//
  let first_version: any = localStorage.getItem("first-version");
  const [dataHistory, setDataHistory] = useState<any>([]);
  const handleClickGetHistoryFile = () => {
    if (type === "file") {
      GetHistoryFile(token, first_version).then((res) => {
        setDataHistory(res.metadata);
        console.log(res.metadata);
      });
    }
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
          isActive={showComment}
          showCmt={() => setShowComment(!showComment)}
          cancelCmt={() => setShowComment(!showComment)}
          createCmt={HandlePostComment}
          onChangeComment={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComment({ ...comment, content: e.target.value });
          }}
          downloadFile={() => {
            DownloadFile(token, folder_id_local);
          }}
          showHistory={showHistory}
          clickShowHistory={() => {
            setShowHistory(!showHistory);
            handleClickGetHistoryFile();
          }}
          dataHistory={dataHistory}
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
