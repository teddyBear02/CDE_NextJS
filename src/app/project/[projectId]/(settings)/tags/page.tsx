"use client";
import {
  SubNav,
  NoTags,
  TagsDelete,
  TagsDeleteAll,
  TagsEdit,
  ListTag,
} from "@/app/components";
import { useState, useEffect, useRef } from "react";
import tagService from "@/service/project/tagsService";
import CheckRole from "@/service/project/checkRole";
import { env } from "@/config/varenv";

export default function Tags() {
  let project_id: any = localStorage.getItem("project_id");

  let token: any = env.TOKEN;

  const [showModalEdit, setShowModalEdit] = useState(false);

  const [showModalDelete, setshowModalDelete] = useState(false);

  const [showDeleteAll, setshowDeleteAll] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const [currTag, setCurrTag] = useState(""); // Default value tag

  const [valueNameTag, setValueNameTag] = useState<any>("");

  const inputNameTagRef = useRef<any>(null);

  const toggleModal = (e: React.MouseEvent<HTMLElement>) => {
    setShowModalEdit(!showModalEdit);
    let tagId = (e.currentTarget.closest(".row") as HTMLElement)?.id;
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setCurrTag(currValue);
    setSelectedItemId(tagId);
  };

  const toggleModalDelete = (e: React.MouseEvent<HTMLElement>) => {
    setshowModalDelete(!showModalDelete);
    let tagId = (e.currentTarget.closest(".row") as HTMLElement)?.id;
    setSelectedItemId(tagId);
  };

  const toggleModalDeleteAll = () => {
    setshowDeleteAll(!showDeleteAll);
  };

  const [tags, setTags] = useState<any[]>([]); // Lưu thông tin nhiều tag : [{}]

  //.......................... xử lý get all tag .................................//

  async function getAllTag() {
    try {
      const tagsData = await tagService.getTags(token, project_id);
      setTags(tagsData);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  useEffect(() => {
    getAllTag();
  }, []);

  //......................... xử lý post 1 tag mới................................//

  const [inforTag, setinforTag] = useState({
    name: "",
    project_id: project_id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinforTag({ ...inforTag, [name]: value });
  };

  async function handleAdd() {
    try {
      const tagsData = await tagService.handleAdd(inforTag, token);
      inputNameTagRef.current.value = "";
      if (tagsData != Object) {
        alert("có lỗi khii thêm tags");
      } else {
        setTags((prev: any) => [...prev, tagsData]);
      }

      console.log(tagsData);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  //..............................................................................//

  //............................. xử lý Update 1 tag..............................//

  const [selectedTag, setSelectedTag] = useState({
    name: "",
  });

  const handleEditClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setCurrTag(currValue);
    setSelectedTag({ ...selectedTag, [name]: value });
  };

  async function handleEditTags() {
    try {
      const response = await tagService.handleEditTags(
        selectedTag,
        token,
        selectedItemId,
        project_id
      );

      let newTagName = {
        id: response.id,
        name: response.name,
      };

      const indexToRemove = tags.findIndex(
        (item: any) => item.id === parseInt(selectedItemId)
      );

      tags.splice(indexToRemove, 1, newTagName);
      setShowModalEdit(!showModalEdit);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  //............................. xử lý DELETE 1 tag..............................//
  const handleDeleteTags = async () => {
    await tagService.handleDeleteTag(
      selectedTag,
      token,
      selectedItemId,
      project_id
    );

    const indexToRemove = tags.findIndex(
      (item: any) => item.id === parseInt(selectedItemId)
    );

    if (indexToRemove !== -1) {
      tags.splice(indexToRemove, 1);
      setshowModalDelete(!showModalDelete);
    }
  };
  //..............................................................................//

  //............................ xử lý DELETE all tag.............................//

  const handleDeleteAllTags = async () => {
    await tagService.handleDeleteAllTag(token, project_id);
    // Xử lý dữ liệu phản hồi (nếu cần)
    setTags(tags.slice(tags.length));
    setshowDeleteAll(!showDeleteAll);
  };

  //..............................................................................//

  const [role, setRole] = useState<boolean>();

  const getInfor = async () => {
    const response = await CheckRole(token, project_id);

    if (response.role == 1) {
      setRole(true);
    } else {
      setRole(false);
    }
  };

  useEffect(() => {
    getInfor();
  }, []);

  return (
    <>
      <div className="container showFolder">
        {role ? (
          <SubNav
            titleNav="Thẻ"
            btnTitle="Mở rộng"
            event={toggleModalDeleteAll}
            showBtn={false}
          />
        ) : (
          <SubNav titleNav="Thẻ" disable={!role} />
        )}

        {showDeleteAll && <TagsDeleteAll deleteAll={handleDeleteAllTags} />}
        <div className="container">
          <div className="tagManager">
            <h4 id="header">Quản lý thẻ</h4>
            <div className="row">
              <div className="col-md-12 col-lg-4 mb-2" id="leftTags">
                <p>
                  Xác định thẻ để cho các thành viên trong dự án có thể sử dụng
                </p>
                <div id="">
                  <h5>Thêm thẻ tùy chỉnh</h5>
                  <hr />
                  <div id="rowTags">
                    <div className="col-80 inpTags">
                      <input
                        type="text"
                        name="name"
                        placeholder="Tên thẻ"
                        onChange={handleInputChange}
                        ref={inputNameTagRef}
                      />
                    </div>
                    <div className="col-20">
                      <button className="btnTags" onClick={handleAdd}>
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" col-8" id="rightTags">
                <div className="row" id="headerTags">
                  <div className="col nameHeader">Thẻ</div>
                  <div className="col-xl-2 actionHeader">Tùy chỉnh</div>
                </div>

                <div>
                  {tags.length === 0 || tags === undefined ? (
                    <NoTags />
                  ) : role ? (
                    <ListTag
                      tags={tags}
                      toggleModal={toggleModal}
                      toggleModalDelete={toggleModalDelete}
                    />
                  ) : (
                    <ListTag
                      tags={tags}
                      toggleModal={toggleModal}
                      disableBtn={true}
                      classDisable={"disableEdit"}
                      toggleModalDelete={toggleModalDelete}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalEdit && (
        <TagsEdit
          showModal={showModalEdit}
          handleClose={toggleModal}
          handleEditTags={handleEditTags}
          handleChangeNewTag={handleEditClick}
          value={currTag}
        />
      )}

      {showModalDelete && (
        <TagsDelete
          showModal={showModalDelete}
          handleClose={toggleModalDelete}
          handleEditTags={handleDeleteTags}
        />
      )}
    </>
  );
}
