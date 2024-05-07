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
  ModalDeleteComment,
} from "@/app/components";
import React, { ReactNode, useEffect, useState, useRef } from "react";
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

import {
  PostComment,
  GetComment,
  DeleteComment,
  UpdateComment,
} from "@/service/project/commentService";

import { env } from "@/config/varenv";

const Folder = () => {
  // local variable:

  const token: any | string = env.TOKEN;

  const project_id: any = localStorage.getItem("project_id");

  const parent_id: any = localStorage.getItem("parent_id");

  const type = localStorage.getItem("type");

  const folder_id_local: any = localStorage.getItem("folder_id");

  const name_folder_local: any = localStorage.getItem("name_folder");

  const idComment: any = localStorage.getItem("idComment");

  const type_num: any = localStorage.getItem("type-num");

  const [data, setData] = useState<any[]>([]); // Store folder's data

  const [dataCanMove, setDataCanMove] = useState<any[]>([]);

  const [parentId, set_parent_id] = useState<any>("0"); // Store folder's parent id

  const [parent_move_id, set_parent_move_id] = useState<any>("0"); // Store folder's parent id

  const [folder_id, set_folder_id] = useState<any>(0); // Store folder's id

  const [nameFolder, setNameFolder] = useState<any>(""); // Store folder's name

  const [newOpen, setNewOpen] = useState(false); // Btn Open setting

  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false); //open modal create Folder

  const [isUploadFile, setIsUploadFile] = useState(false); // Modal upload file /folder

  const [option, setOption] = useState<any>(); // 1, 2, 3

  const [file, setFile] = useState<undefined | File | any>(); // File

  const [display, setDisplay] = useState(""); // search result

  const [listTags, setListTags] = useState<any[]>([]); // Tags của một folder/ file

  const [activeHover, setActiveHover] = useState<number>();

  const [isEditComment, setIsEditComment] = useState(0); // đang edit hay không

  const [listComments, setListComments] = useState<any[]>([]); // chứa danh sách comments

  const [isOpenEditComment, setIsOpenEditComment] = useState<any>(false); // mở ô text để edit

  const [isShowModalComment, setIsShowModalComment] = useState<boolean>(false); // mở edit / delete

  const [valueCommemt, setValueComment] = useState<any>("");

  const [parentIdToEdit, setParentIdToEdit] = useState<any>(0);

  const [nameToEdit, setNameToEdit] = useState<any>("");

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

  const dropdownRef = useRef<any>(null);

  const btnDropRef = useRef<any>(null);

  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(e.target as Node)
  //     ) {
  //       setIsEditComment(0);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    const currVal = (e.currentTarget.closest(".list-item") as HTMLElement)?.id;
    localStorage.setItem("idComment", currVal);
    setIsEditComment(parseInt(currVal));
  };

  const toggleModalDeleteComment = () => {
    setIsShowModalComment(!isShowModalComment);
    setIsEditComment(0);
  };

  const handleModalEditComment = (e: React.MouseEvent) => {
    const value = (e.currentTarget.closest(".list-item") as HTMLElement).id;
    listComments.filter((comment) => {
      comment.id === parseInt(value) ? setValueComment(comment.content) : null;
    });
    setIsOpenEditComment(parseInt(value));
    setIsEditComment(0);
  };

  const handleCancelEditComment = () => {
    setIsOpenEditComment(0);
  };

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

    data.map((folder) => {
      if (e.currentTarget.classList.contains("file")) {
        localStorage.setItem("parent_id", folder.folder_id);
        localStorage.setItem("first-version", folder.first_version);
        setListTags(folder.tag);
      } else if (
        e.currentTarget.classList.contains("folder") &&
        parseInt(folder.id) === parseInt(currValue)
      ) {
        localStorage.setItem("parent_id", folder.parent_id);
        setNameToEdit(name_folder);
        setParentIdToEdit(folder.parent_id);
        setListTags(folder.tag);
      }
    });

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

  console.log(nameToEdit);

  //.......................................................................//

  const toFolder = (e: React.MouseEvent) => {
    let idGoTo: any = (e.currentTarget.closest(".hoverItemNav") as HTMLElement)
      ?.id;
    let indexItem: any = parseInt(e.currentTarget.classList[1]);
    setDataFolder({ ...dataFolder, parent_id: idGoTo });
    set_parent_id(idGoTo);
    elemNav.splice(indexItem + 1, elemNav.length - indexItem);
  };

  //......................GET Comment...................................//

  const getComment = async () => {
    if (type_num === "0") {
      await GetComment(token, 0, folder_id).then((res: any) =>
        setListComments(res.data.metadata)
      );
    } else if (type_num === "1") {
      await GetComment(token, 1, folder_id).then((res: any) =>
        setListComments(res.data.metadata)
      );
    }
  };

  useEffect(() => {
    getComment();
  }, [folder_id]);

  //...........................POST Comment...............................//

  const [comment, setComment] = useState({
    type: type_num,
    another_id: folder_id_local,
    content: "",
  });

  const handleOnchangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type_num === "0") {
      setComment({
        ...comment,
        type: 0,
        content: e.currentTarget.value,
      });
    } else {
      setComment({
        ...comment,
        type: 1,
        content: e.currentTarget.value,
      });
    }
  };

  const HandlePostComment = async () => {
    await PostComment(token, comment, project_id).then((res: any) =>
      setListComments([res.data.metadata, ...listComments])
    );

    setShowComment(false);
  };

  //............................DELETE Comment...............................//

  const HandleDeleteComment = async () => {
    await DeleteComment(parseInt(idComment), project_id, token);

    const indexToRemove = listComments.findIndex(
      (item: any) => item.id === parseInt(idComment)
    );

    listComments.splice(indexToRemove, 1);

    setIsShowModalComment(false);
  };

  //............................UPDATE Comment...............................//

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal: any = e.currentTarget.closest(".content")?.textContent;
    setValueComment(currentVal);
    if (type_num === "0") {
      setComment({
        ...comment,
        type: 0,
        content: e.currentTarget.value,
      });
    } else if (type_num === "1") {
      setComment({
        ...comment,
        type: 1,
        content: e.currentTarget.value,
      });
    }
  };

  const HandleUpdateComment = async () => {
    const res = await UpdateComment(idComment, project_id, token, comment).then(
      (res: any) => res.data.metadata
    );

    const indexChange = listComments.findIndex(
      (item: any) => item.id === parseInt(idComment)
    );

    if (indexChange != -1) {
      listComments.splice(indexChange, 1, res);
    }
    setValueComment("");
    setIsOpenEditComment(false);
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
  //còn bị conflict back về folder cũ - chưa set lại đc parent_id (test lại)

  const [dataFolder, setDataFolder] = useState({
    name: "",
    parent_id: parentId,
    project_id: project_id,
  });

  const handleCreateFolder = async () => {
    const response = await createFolder(dataFolder, token);
    setData(() => [response, ...data]);
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
    parent_id: 0,
    project_id: project_id,
  });

  // edit data folder
  const [folderEdit, setFolderEdit] = useState({
    name: name_folder_local,
    parent_id: parent_id,
    project_id: project_id,
  });

  // add tag data folder

  const [addTagFolder, setAddTagFolder] = useState({
    name: nameToEdit,
    parent_id: parent_id,
    project_id: project_id,
    tag: "",
  });

  // edit data file
  const [fileEdit, setFileEdit] = useState({
    name: nameToEdit,
    folder_id: parent_id,
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
    const tagsId = listTags?.map((tag) => tag.id);
    if (type === "folder") {
      setAddTagFolder({
        ...addTagFolder,
        parent_id: parentIdToEdit,
        name: nameToEdit,
        tag: `${tagsId.toString()}`,
      });
    } else if (type === "file") {
      setFileEdit({ ...fileEdit, tag: `${tagsId.toString()}` });
    }
  }, [listTags]);

  const handleChangeFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setNameFolder(currValue);

    if (folderEdit.name != e.target.value && type == "folder") {
      setFolderEdit({
        ...folderEdit,
        name: e.target.value,
        parent_id: parentIdToEdit,
      });
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
    let currValue: any = (e.currentTarget.closest(".list-item") as HTMLElement)
      ?.id;

    if (
      parseInt(dataMoveFile.parent_id) !== parseInt(currValue) &&
      type == "folder"
    ) {
      setDataMoveFolder({
        ...dataMoveFolder,
        name: nameFolder,
        parent_id: parseInt(currValue),
      });
      setOption("2");
    } else if (type == "file") {
      setFileEdit({
        ...fileEdit,
        folder_id: currValue,
      });
      setOption("2");
    }
  };

  const handleUpdateFolder = async () => {
    // type = file
    if (type == "file") {
      switch (option) {
        case "1":
          const responseChangeName = FileUpdate(
            token,
            folder_id_local,
            fileEdit,
            option
          ).then((res: any) => console.log(res.data.metadata));

          const indexChangeName = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexChangeName, 1, responseChangeName);
          setShowMoveFolder(!showMoveFolder);
          setShowOption(!showOption);
          break;
        case "2":
          FileUpdate(token, folder_id_local, fileEdit, option);
          const indexMove = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexMove, 1);
          setShowMoveFolder(!showMoveFolder);
          setShowOption(!showOption);
          break;
        case "3":
          const responseAddTag = FileUpdate(
            token,
            folder_id_local,
            fileEdit,
            option
          );
          const indexAddTag = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexAddTag, 1, responseAddTag);
          setShowOption(!showOption);
          setShowEdit(false);
          break;
        default:
          break;
      }
    } else if (type == "folder") {
      // type = folder
      switch (option) {
        case "1": // Đổi tên thư mục
          const responseChangeName: any = await updateFolder(
            token,
            folderEdit,
            folder_id_local,
            option
          );
          const indexChange = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexChange, 1, responseChangeName);
          setShowOption(!showOption);
          break;
        case "2": // Di chuyển thư mục tới thư mục khác
          await updateFolder(token, dataMoveFolder, folder_id_local, option);
          const indexMove = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );
          data.splice(indexMove, 1);
          setShowMoveFolder(!showMoveFolder);
          setShowOption(!showOption);

          break;
        case "3": // Thêm tags
          const responseAddTag: any = await updateFolder(
            token,
            addTagFolder,
            folder_id_local,
            option
          );
          const indexAddTag = data.findIndex(
            (item: any) => item.id === parseInt(folder_id)
          );

          data.splice(indexAddTag, 1, responseAddTag);
          setShowOption(!showOption);
          setShowEdit(!showEdit);

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
    setData([...data, response.data.metadata]);
    setIsUploadFile(false);
  }

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
              statusTodo="Tags"
              eventClick={handleClick}
              folders={data}
            />
          </div>
        )}
      </div>

      {showOption && (
        <DetailFolder
          valueComment={valueCommemt}
          handleCancelEdit={handleCancelEditComment}
          onChangeInputComment={handleOnChangeComment}
          handleSaveEditCmt={HandleUpdateComment}
          handleShowEditCmt={handleModalEditComment}
          isOpenEditComment={isOpenEditComment}
          handleShowModalComment={toggleModalDeleteComment}
          btnDropRef={btnDropRef}
          listComment={listComments}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          isEditComment={isEditComment}
          dataTag={listTags}
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
          onChangeComment={handleOnchangeComment}
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

      {isShowModalComment && (
        <ModalDeleteComment
          handleClose={toggleModalDeleteComment}
          handleDeleteComment={HandleDeleteComment}
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
