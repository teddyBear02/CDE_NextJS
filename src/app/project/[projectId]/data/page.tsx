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
import React, {
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
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

const Folder = () => {
  // local variable:

  let token = env.TOKEN;

  let project_id: any = localStorage.getItem("project_id");

  let parent_id: any = localStorage.getItem("parent_id");

  let type = localStorage.getItem("type");

  let folder_id_local: any = localStorage.getItem("folder_id");

  let name_folder_local: any = localStorage.getItem("name_folder");

  const [data, setData] = useState<any[]>([]); // Store folder's data

  const [dataCanMove, setDataCanMove] = useState<any[]>([]);

  const [parentId, set_parent_id] = useState<any>("0"); // Store folder's parent id

  const [parent_move_id, set_parent_move_id] = useState<any>("0"); // Store folder's parent id

  const [folder_id, set_folder_id] = useState<any>(0); // Store folder's id

  const [nameFolder, setNameFolder] = useState<any>(""); // Store folder's name

  const [newOpen, setNewOpen] = useState(false); // Btn Open setting

  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false); //open modal create Folder

  const [isUploadFile, setIsUploadFile] = useState(false); // Modal upload file /folder

  const [option, setOption] = useState<any>();

  const [file, setFile] = useState<undefined | File | any>(); // File

  const [display, setDisplay] = useState(""); // search result

  const [listTags, setListTags] = useState<any[]>([]); // Tags của một folder/ file

  const [activeHover, setActiveHover] = useState(false);

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

  // Ref elem:

  const inpTagRef = useRef<HTMLInputElement | any>("");

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
  //....................................................//

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

  //......................................................................//

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
        setListTags(folder.tag);
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

  //.......................................................................//

  const toFolder = (e: React.MouseEvent) => {
    let idGoTo: any = (e.currentTarget.closest(".hoverItemNav") as HTMLElement)
      ?.id;
    let indexItem: any = parseInt(e.currentTarget.classList[1]);
    setDataFolder({ ...dataFolder, parent_id: idGoTo });
    set_parent_id(idGoTo);
    elemNav.splice(indexItem + 1, elemNav.length - indexItem);
  };

  //....................GET folders (Done)..............................//

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

  //.........................UPDATE Folder...........................// (Xong thêm tag, rename)

  // move data file
  const [dataMoveFile, setDataMoveFile] = useState({
    name: "",
    parent_id: parent_id,
    project_id: project_id,
  });

  // move data folder
  const [dataMoveFolder, setDataMoveFolder] = useState({
    name: "",
    parent_id: "",
    project_id: project_id,
  });

  // edit data folder
  const [folderEdit, setFolderEdit] = useState({
    name: name_folder_local,
    parent_id: parent_id,
    project_id: project_id,
  });

  // edit data file
  const [fileEdit, setFileEdit] = useState({
    name: "",
    folder_id: parent_id,
    project_id: project_id,
  });

  // add tag data folder

  const [addTagFolder, setAddTagFolder] = useState({
    name: name_folder_local,
    parent_id: parent_id,
    project_id: project_id,
    tag: "",
  });

  //.......................Get all folder can move.......................//

  const getFolderCanMove = () => {
    GetFolderCanMove(
      token,
      type,
      folder_id_local,
      parent_move_id,
      project_id
    ).then((res: any) => {
      setDataCanMove(res.data.metadata);
    });
  };

  useEffect(() => {
    getFolderCanMove();
  }, [parent_move_id, folder_id_local]);

  //..........................Get all tags...............................//

  const [tags, setTags] = useState<any[]>([]); // Lấy tất cả các tags trong dự án

  const [searchResult, setSearchResult] = useState<any[]>([]); // kết quả tìm kiếm khi search

  const getAllTags = async () => {
    const response = await tagService.getTags(token, project_id);
    setTags(response);
  };

  useEffect(() => {
    getAllTags();
  }, [project_id]);

  const handleChangeTagInput = () => {
    const value = inpTagRef.current.value;
    const result = tags.filter((tag) => tag.name.includes(value));
    if (value.length >= 1) {
      setDisplay("show");
      setSearchResult(result);
    } else if (value.length == 0) {
      setDisplay("");
    }
  };

  const choseTag = (e: React.MouseEvent) => {
    let currVal = (e.currentTarget.closest(".search-result") as HTMLElement)
      ?.id;

    tags.map((tag) => {
      if (tag.id == currVal) {
        setListTags([...listTags, tag]);
      }
    });

    setOption("3");
    inpTagRef.current.value = "";
    setDisplay("");
  };

  const rejectTag = (e: any) => {
    let currVal = (e.currentTarget.closest(".chips") as HTMLElement)?.id;

    const indexToRemove = listTags.findIndex(
      (item: any) => item.id === parseInt(currVal)
    );

    const newListTags = listTags.filter((tag) => tag.id !== parseInt(currVal));

    setListTags(newListTags);

    setOption("3");
  };

  useEffect(() => {
    const tagsId = listTags.map((tag) => tag.id);
    setAddTagFolder({ ...addTagFolder, tag: `${tagsId.toString()}` });
  }, [listTags]);

  const handleChangeFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setNameFolder(currValue);
    if (folderEdit.name != e.target.value && type == "folder") {
      setFolderEdit({ ...folderEdit, name: e.target.value });
      setOption("1");
    }

    if (folderEdit.name != e.target.value && type == "file") {
      setFileEdit({ ...fileEdit, name: e.target.value });
      setOption("1");
    }
  };

  const goToFolder = (e: React.MouseEvent) => {
    let currValue: any = (e.currentTarget.parentElement as HTMLElement)?.id;
    set_parent_move_id(currValue);
  };

  // click để đi vào bên trong 1 folder can move
  const handleClickFolderToMove = (e: React.MouseEvent) => {
    let currValue: any = (e.currentTarget.closest(".itemFolder") as HTMLElement)
      ?.id;

    if (currValue == parent_move_id) {
      setActiveHover(true);
    } else {
      setActiveHover(false);
    }

    if (dataMoveFile.parent_id != currValue && type == "folder") {
      setDataMoveFolder({
        ...dataMoveFolder,
        name: nameFolder,
        parent_id: currValue,
      });
      setOption("2");
    }
  };

  const handleUpdateFolder = async () => {
    // type = file
    if (type == "file") {
      switch (option) {
        case "1":
          const res = FileUpdate(token, folder_id_local, fileEdit, option);
          const indexChange = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          break;
        case "2":
          console.log(2);
          break;
        default:
          break;
      }
    } else if (type == "folder") {
      // type = folder
      switch (option) {
        case "1": // Đổi tên thư mục
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
        case "2": // Di chuyển thư mục tới thư mục khác
          const response2: any = await updateFolder(
            token,
            dataMoveFolder,
            folder_id_local,
            option
          );
          const indexMove = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexMove, 1);
          setShowMoveFolder(!showMoveFolder);
          setShowOption(!showOption);
          break;
        case "3": // Thêm tags
          const response3: any = await updateFolder(
            token,
            addTagFolder,
            folder_id_local,
            option
          );
          break;
        default:
          console.error(new Error());
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

  //.........................Move Folder/File to another Folder..........................//

  const handleMoveFolder = async () => {
    if (type === "file") {
      const response = FileUpdate(token, folder_id_local, dataMoveFile, 2);
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
          rejectTag={rejectTag}
          handleBack={handleBack}
          nameFolder={nameFolder}
          handleToogleEdit={handleToogleEdit}
          handleHideOption={handleHideOption}
          showModalDelete={() => setShowDeleteFolder(true)}
          saveBtn={handleUpdateFolder}
          handleChange={handleChangeFolder}
          value={nameFolder}
          handleShowMoveFolder={() => {
            setShowMoveFolder(true);
          }}
          folders={dataCanMove}
          handleClickMove={handleUpdateFolder}
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
          tags={listTags}
          tagLenghtVal={inpTagRef}
          changNameTag={handleChangeTagInput}
          display={display}
          searchResult={searchResult}
          choseTag={choseTag}
          goIntoFolder={goToFolder}
          actveItem={activeHover}
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
