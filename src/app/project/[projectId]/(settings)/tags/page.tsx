"use client";
import {
  SubNav,
  NoTags,
  TagsDelete,
  TagsDeleteAll,
  TagsEdit,
} from "@/app/components";
import { useState, useEffect } from "react";
import tagSevice from "@/service/tagsService";

interface Tag {
  id: number;
  TagName: string;
}

export default function Tags() {
  let projectId: any;

  let token: any;

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      projectId = localStorage.getItem("projectId");
      token = localStorage.getItem("Token");
    } else {
      console.log("Error !!!");
    }
  }, []);

  console.log(projectId, token);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const [showModalDelete, setshowModalDelete] = useState(false);

  const [showDeleteAll, setshowDeleteAll] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const [currTag, setCurrTag] = useState(""); // Default value tag

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

  const [tags, setTags] = useState<Tag[]>([]); // Lưu thông tin nhiều tag : [{}]

  //.......................... xử lý get all tag .................................//

  async function getAllTag() {
    try {
      const tagsData = await tagSevice.getTags(token, projectId);
      if (tagsData) {
        setTags(() => [...tagsData]);
        console.log(tagsData);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  useEffect(() => {
    getAllTag();
  }, []);

  //......................... xử lý post 1 tag mới................................//

  const [inforTag, setinforTag] = useState({
    TagName: "",
    ProjectID: projectId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinforTag({ ...inforTag, [name]: value });
  };

  async function handleAdd() {
    try {
      const tagsData = await tagSevice.handleAdd(inforTag, token);
      setTags((prev: any) => [...prev, tagsData]);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  //..............................................................................//

  //............................. xử lý Update 1 tag..............................//

  const [selectedTag, setSelectedTag] = useState({
    TagName: "",
  });

  const handleEditClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let currValue: any = e.currentTarget?.closest(".row")?.textContent;
    setCurrTag(currValue);
    setSelectedTag({ ...selectedTag, [name]: value });
  };

  async function handleEditTags() {
    try {
      const tagsData = await tagSevice.handleEditTags(
        selectedTag,
        token,
        selectedItemId,
        projectId
      );

      let newTagName = {
        id: tagsData.id,
        TagName: tagsData.TagName,
      };
      const indexToRemove = tags.findIndex(
        (item: any) => item.id === parseInt(selectedItemId)
      );

      tags.splice(indexToRemove, 1, newTagName);
      setShowModalEdit(!showModalEdit);

      console.log(tagsData);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  //............................. xử lý DELETE 1 tag..............................//
  async function handleDeleteTags() {
    const handleDeleteTags = await tagSevice.handleDeleteTag(
      selectedTag,
      token,
      selectedItemId,
      projectId
    );
  }
  const handleDeleteTag = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tag/${selectedItemId}/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedTag), // Chuyển đổi dữ liệu thành chuỗi JSON
        }
      );

      if (!response.ok) {
        throw new Error("Không thành công");
      }
      // Xử lý dữ liệu phản hồi (nếu cần)
      const responseData = await response.json();
      console.log("Dữ liệu phản hồi:", responseData);
      const indexToRemove = tags.findIndex(
        (item: any) => item.id === parseInt(selectedItemId)
      );

      if (indexToRemove !== -1) {
        tags.splice(indexToRemove, 1);
        setshowModalDelete(!showModalDelete);
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu DELETE:", error);
    }
  };
  //..............................................................................//

  //............................ xử lý DELETE all tag.............................//
  const handleDeleteAllTags = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tag/removeAll/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thành công");
      }
      // Xử lý dữ liệu phản hồi (nếu cần)
      const responseData = await response.json();
      console.log("Dữ liệu phản hồi:", responseData);
      setTags(tags.slice(tags.length));
      setshowDeleteAll(!showDeleteAll);
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu DELETE:", error);
    }
  };

  //..............................................................................//

  const [role, setRole]: boolean | any = useState();

  useEffect(() => {
    const getInfor = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/checkRole/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          let dataTag = data.metadata;

          if (dataTag.Role == 1) {
            setRole(true);
          } else {
            setRole(false);
          }
        } else {
          const errorData = await response.json();
          console.error("Failed:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Gọi hàm khi component được mount
    getInfor();
  }, []);

  return (
    <>
      <div className="container showFolder">
        {role ? (
          <SubNav
            titleNav="Thẻ"
            btnTitle="Extension"
            event={toggleModalDeleteAll}
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
                        name="TagName"
                        placeholder="Tên thẻ"
                        onChange={handleInputChange}
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
                  <div className="col nameHeader">Tags</div>
                  <div className="col-xl-2 actionHeader">Actions</div>
                </div>

                <div>
                  {tags.length === 0 ? (
                    <NoTags />
                  ) : role ? (
                    <ul className="listTags">
                      {tags.map((item: any) => (
                        <li className="row" key={item.id} id={`${item.id}`}>
                          <div className="nameTag col">{item.TagName}</div>
                          <div className="col-xl-2 actionTags">
                            <button onClick={toggleModal}>
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button onClick={toggleModalDelete}>
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="listTags">
                      {tags.map((item: any) => (
                        <li className="row" key={item.id} id={`${item.id}`}>
                          <div className="nameTag col">{item.TagName}</div>
                          <div className="col-xl-2 actionTags">
                            <button className="disableEdit" disabled>
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button className="disableEdit" disabled>
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
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
