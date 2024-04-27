"use client";
import { use, useState } from "react";
import {
  SubNav,
  ModalNewTodo,
  TodoList,
  NoneTodo,
  DetailTodo,
} from "@/app/components";
import { PostTodo } from "@/service/project/todoService";
import { PostComment } from "@/service/project/commentService";

export default function Todo() {
  let token: any = localStorage.getItem("Token");

  let project_id = localStorage.getItem("project_id");

  const [showModalTodo, setShowModalTodo] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const handleHideOption = () => {
    setShowEdit(false);
    setShowDetail(false);
  };

  const toggleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const toggleClick = () => {
    setIsActive(!isActive);
  };

  let data: any = [
    {
      name: "Test1",
    },
  ];

  const [todoEdit, setTodoEdit] = useState({
    Title: "",
    StartDate: "",
    FinishDate: "",
    ProjectID: project_id,
  });

  const handleCreateTodo = async () => {
    const response = await PostTodo(token, todoEdit);
  };

  const [comment, setComment] = useState({
    type: "",
    another_id: "",
    content: "",
  });

  const handleComment = async () => {
    await PostComment(token, comment);
  };

  return (
    <>
      <div className="container showFolder">
        <SubNav
          titleNav="Việc cần làm"
          btnTitle="Tạo mới"
          event={() => setShowModalTodo(true)}
        />
        <div className="container showFolder">
          <div className="toolbar-section">
            <div className="filtersWrapper">
              <div className="filtersContianer">
                <div className="filter">
                  <span>Owner</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Users</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Groups</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Status</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Priority</span>{" "}
                  <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Date modified</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
            </div>
          </div>
          {(data != undefined || data != null) && data.length > 0 ? (
            <TodoList
              title="Tiêu đề"
              user="Người tạo"
              timeCreate="Thời gian tạo"
              timeModified="Sửa đổi"
              state="Ưu tiên"
              status="Trạng thái"
              data={data}
              handleClick={() => setShowDetail(true)}
            />
          ) : (
            <NoneTodo />
          )}
        </div>
      </div>

      {showDetail && (
        <DetailTodo
          isEdit={showEdit}
          handleBack={toggleEditClick}
          saveBtn={""}
          handleHideOption={handleHideOption}
          handleToogleEdit={toggleEditClick}
          isActive={isActive}
          showCmt={toggleClick}
          cancelCmt={toggleClick}
          createCmt={handleComment}
          onChangeComment={(e: any) => {
            setComment({ ...comment, content: e.target.value });
          }}
        />
      )}

      {showModalTodo && (
        <ModalNewTodo
          closeModal={() => setShowModalTodo(false)}
          handleInputName={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, Title: e.target.value });
          }}
          handleInputStart={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, StartDate: e.target.value });
          }}
          handleInputEnd={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, FinishDate: e.target.value });
          }}
          createTodo={handleCreateTodo}
        />
      )}
    </>
  );
}
