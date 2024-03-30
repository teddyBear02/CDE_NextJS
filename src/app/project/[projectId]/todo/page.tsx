"use client";
import { useState } from "react";
import { SubNav, ModalNewTodo, TodoList, NoneTodo } from "@/app/components";
import { PostTodo } from "@/service/project/todoService";

export default function Todo() {
  let token: any = localStorage.getItem("Token");

  let project_id = localStorage.getItem("project_id");

  const [showModalTodo, setShowModalTodo] = useState(false);

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
            />
          ) : (
            <NoneTodo />
          )}
        </div>
      </div>

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
