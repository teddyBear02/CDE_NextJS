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
  DeleteFile,
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

  let parent_id_to_move: any = localStorage.getItem("parent_id_to_move");

  const [data, setData] = useState<any[]>([]);

  const [dataCanMove, setDataCanMove] = useState<any[]>([]);

  const [parentId, set_parent_id] = useState<any>("0"); // Store folder's parent id

  const [folder_id, set_folder_id] = useState<any>(0); // Store folder's id

  const [nameFolder, setNameFolder] = useState(""); // Store folder's name

  const [newOpen, setNewOpen] = useState(false); // Btn Open setting

  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false); //open modal create Folder

  const [isUploadFile, setIsUploadFile] = useState(false); // Modal upload file /folder

  const [option, setOption] = useState<any>();

  const [file, setFile] = useState<undefined | File | any>(); // File

  // show right bar

  const [showOption, setShowOption] = useState(false); // Show Folder Detail

  const [showEdit, setShowEdit] = useState(false); // Edit Folder name

  const [showDeleteFolder, setShowDeleteFolder] = useState(false); // Show Delete Modal

  const [showMoveFolder, setShowMoveFolder] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  // comment state:

  const [showComment, setShowComment] = useState(false);

  const [elemNav, setEmlemNav] = useState<any>([
    {
      name: "Thư mục",
      id: 0,
    },
  ]);

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
      }, 500);
    } else if (clickCount === 2) {
      setShowOption(false);
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
    if (clickCount > 0) {
      for (let folder of data) {
        if (folder.versions >= 1) {
        }
      }
      set_parent_id(currValue);
      setDataFolder({ ...dataFolder, parent_id: currValue });
      setEmlemNav([...elemNav, { name: name_folder, id: currValue }]);
    }
  };

  const toFolder = (e: React.MouseEvent) => {
    let idGoTo: any = (e.currentTarget.closest(".hoverItemNav") as HTMLElement)
      ?.id;
    let indexItem: any = parseInt(e.currentTarget.classList[1]);
    setDataFolder({ ...dataFolder, parent_id: idGoTo });
    set_parent_id(idGoTo);
    elemNav.splice(indexItem + 1, elemNav.length - indexItem);
  };

  //....................GET folders (Done)..............................//

  // const [tags, setTags] = useState<any[]>([]);

  const getFolderData = async () => {
    const res = await getFolder(token, project_id, parentId);
    const foldersAndFiles = [...res.folders, ...res.files];
    setData(foldersAndFiles);
  };

  useEffect(() => {
    getFolderData();
  }, [parentId]);

  //......................POST folder (done)..............................//
  //còn bị conflict back về folder cũ - chưa set lại đc parent_id

  const [dataFolder, setDataFolder] = useState({
    name: "",
    parent_id: parentId,
    project_id: project_id,
  });

  const handleCreateFolder = async () => {
    const response = await createFolder(dataFolder, token);
    setData(() => [...data, response]);
    setIsOpenCreateFolder(false);
  };

  //.........................DELETE Folder (done)...........................//

  const handleDeleteFolder = async () => {
    if (type == "folder") {
      await deleteFolder(token, folder_id, project_id);
      const indexToRemove = data.findIndex(
        (item: any) => item.id === parseInt(folder_id)
      );

      if (indexToRemove !== -1) {
        data.splice(indexToRemove, 1);
      }
      setShowDeleteFolder(false);
      setShowOption(false);
    } else if (type == "file") {
      DeleteFile(token, folder_id_local, project_id);
      const indexToRemove = data.findIndex(
        (item: any) => item.id === parseInt(folder_id)
      );

      if (indexToRemove !== -1) {
        data.splice(indexToRemove, 1);
      }
      setShowDeleteFolder(false);
      setShowOption(false);
    }
  };

  //.........................UPDATE Folder...........................//

  const [folderEdit, setFolderEdit] = useState({
    name: "",
    parent_id: parent_id,
    project_id: project_id,
  });

  const [fileEdit, setFileEdit] = useState({
    name: "",
    folder_id: parent_id,
    project_id: project_id,
  });

  const handleChangeFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setNameFolder(currValue);
    if (folderEdit.name != e.target.value && type == "folder") {
      setFolderEdit({ ...folderEdit, name: e.target.value });
      setOption("1");
    } else if (folderEdit.parent_id != parent_id_to_move && type == "folder") {
      setFolderEdit({ ...folderEdit, parent_id: parent_id_to_move });
      setOption("2");
    }

    if (folderEdit.name != e.target.value && type == "file") {
      setFileEdit({ ...fileEdit, name: e.target.value });
      setOption("1");
    }
  };

  const handleUpdateFolder = async () => {
    // type = file
    if (type === "file") {
      const res = FileUpdate(token, folder_id_local, fileEdit, option);
      const indexChange = data.findIndex(
        (item: any) => item.id === parseInt(folder_id)
      );
      // data.splice(indexChange, 1, res);
      // setShowEdit(!showEdit);
      // setShowOption(!showOption);
      console.table(indexChange);
    } else {
      // type = folder
      switch (option) {
        case 1: // Đổi tên thư mục
          const response1: any = await updateFolder(
            token,
            folderEdit,
            folder_id_local,
            option
          );
          const indexChange = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexChange, 1, response1);
          setShowEdit(!showEdit);
          setShowOption(!showOption);
          break;
        case 2: // Di chuyển thư mục tới thư mục khác
          const response2: any = await updateFolder(
            token,
            folderEdit,
            folder_id_local,
            option
          );
          const indexMove = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexMove, 1);
          setShowOption(!showOption);
          break;
        case 3: // Thêm tags
          const response3: any = await updateFolder(
            token,
            folderEdit,
            folder_id_local,
            option
          );
          break;
        default:
          break;
      }
    }
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

    const response: any = await FileUpload(token, formData);
    console.log(response);
    setIsUploadFile(!isUploadFile);
  }

  //......................Update File...........................//

  // const handleUpdateFile = () => {
  //   FileUpdate(token, folder_id_local, data);
  // };

  //.......................Get all folder can move.......................//

  const handleGetFolderCanMove = () => {
    GetFolderCanMove(token, type, folder_id_local, parent_id, project_id).then(
      (res: any) => {
        setDataCanMove(res.data.metadata);
      }
    );
  };

  //.........................Move Folder/File to another Folder..........................//

  let name_folder_local: any = localStorage.getItem("name_folder");

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
      const response = FileUpdate(token, folder_id_local, dataMoveFile, 2);
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

  if (data.length == 0 && parentId == 0) {
    NoneComponent = (
      <NoneFolder
        openCreateFolder={() => {
          setIsOpenCreateFolder(!isOpenCreateFolder);
          setNewOpen(false);
        }}
      />
    );
  } else if (data.length == 0 && parentId != 0) {
    NoneComponent = <NoneData />;
  }

  return (
    <>
      <div className="container showFolder">
        <div>
          <SubNav
            titleNav="Thư mục"
            btnTitle="Tạo mới"
            event={handleNewOpen}
            elemNav={elemNav}
            toFolder={toFolder}
          />
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
              timeUpdate="Ngày sửa đổi"
              size="Kích thước"
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
