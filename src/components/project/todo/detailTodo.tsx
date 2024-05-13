"use client";
import { formatDate } from "@/until/Helper";
import { env } from "@/config/varenv";
import { deleteTodo, editTodo } from "@/service/project/todoService";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  data: any;
  handleToogleEdit?: any;
  handleHideOption: any;
  isActive?: any;
  onChangeComment: any;
  cancelCmt: any;
  createCmt: any;
  showCmt: any;
  isEdit: any;
  handleBack: any;
  saveBtn: any;
}
const checkboxesOwner = [
  { label: "Được giao cho tôi", value: 1 },
  { label: "Tạo bởi tôi", value: 2 },
  { label: "Không được giao", value: 3 },
];
const checkboxesStatus = [
  { label: "Mới", value: 1 },
  { label: "Đang làm", value: 2 },
  { label: "Đang chờ", value: 3 },
  { label: "Hoàn thành", value: 4 },
  { label: "Đóng", value: 5 },
];
const checkboxesPriority = [
  { label: "Nghiêm trọng", value: 4 },
  { label: "Cao", value: 3 },
  { label: "Bình thường", value: 2 },
  { label: "Thấp", value: 1 },
];

const DetailTodo = ({
  data,
  handleHideOption,
  handleToogleEdit,
  isActive,
  onChangeComment,
  cancelCmt,
  createCmt,
  showCmt,
  isEdit,
  handleBack,
  saveBtn,
}: Props) => {
  const token = env.TOKEN;
  let project_id = localStorage.getItem("project_id");

  const [dataFormEdit, setDataFormEdit] = useState({
    assginTo: data.assgin_to ?? "",
    title: data.title ?? "",
    descriptions: data.descriptions ?? "",
    state: data.priorities,
    status: data.status,
    startDate: data.start_date,
    finishDate: data.finish_date,
  });
  useEffect(() => {
    setDataFormEdit({
      assginTo: data.assgin_to ?? "",
      title: data.title ?? "",
      descriptions: data.descriptions ?? "",
      state: data.priorities,
      status: data.status,
      startDate: data.start_date,
      finishDate: data.finish_date,
    });
  }, [data]);

  const handleDataFormChange = (
    key: string,
    value: string | number | Date | null
  ) => {
    setDataFormEdit((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  function getLabelFromArray(value: string, array: any) {
    const item = array.find((item: any) => item.value === value);
    return item ? item.label : "";
  }
  function getStatusLabel(statusValue: string) {
    return getLabelFromArray(statusValue, checkboxesStatus);
  }

  function getStateLabel(stateValue: string) {
    return getLabelFromArray(stateValue, checkboxesPriority);
  }

  const [isCallingApiEdit, setIsCallingApiEdit] = useState(false);
  const handleEditTodo = async () => {
    console.log(dataFormEdit, data.id, project_id);
    setIsCallingApiEdit(true);
    const response = await editTodo(token, dataFormEdit, data.id, project_id);
    setIsCallingApiEdit(false);
  };
  const handleSubmitFormEdit = async () => {
    await handleEditTodo();
    saveBtn();
  };
  const handleDeleteToDo = async () => {
    await deleteTodo(token, data.id, project_id);
    saveBtn();
  };
  return (
    <>
      <div className="right">
        {isEdit ? (
          <>
            <div className="header">
              <button className="btn" onClick={handleBack}>
                <i className="bi bi-arrow-left"></i>
              </button>
              <h3>Chỉnh sửa</h3>
              <button className="btn exit" onClick={handleHideOption}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <section className="">
              <div className="panel-body">
                <form action="#">
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Tiêu đề</label>
                      <div className="input-focus-group">
                        <input
                          type="text"
                          onChange={(event) =>
                            handleDataFormChange("title", event.target.value)
                          }
                          value={dataFormEdit.title}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Gửi cho</label>
                      <div className="input-focus-group">
                        <input
                          type="email"
                          onChange={(event) =>
                            handleDataFormChange("assginTo", event.target.value)
                          }
                          value={dataFormEdit.assginTo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Miêu tả</label>
                      <div className="input-focus-group">
                        <textarea
                          onChange={(event) =>
                            handleDataFormChange(
                              "descriptions",
                              event.target.value
                            )
                          }
                          value={data?.descriptions}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Ngày bắt đầu</label>
                      <ReactDatePicker
                        selected={dataFormEdit.startDate}
                        onChange={(date) =>
                          handleDataFormChange("startDate", date)
                        }
                      />
                    </div>
                  </div>
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Ngày kết thúc</label>
                      <ReactDatePicker
                        selected={dataFormEdit.startDate}
                        onChange={(date) =>
                          handleDataFormChange("finishDate", date)
                        }
                      />
                    </div>
                  </div>
                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Trạng thái </label>
                      <div className="input-focus-group">
                        <select
                          value={dataFormEdit.status}
                          onChange={(e) =>
                            handleDataFormChange("status", e.target.value)
                          }
                        >
                          {checkboxesStatus.map((checkbox) => (
                            <option key={checkbox.value} value={checkbox.value}>
                              {checkbox.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Ưu tiên </label>
                      <div className="input-focus-group">
                        <select
                          name=""
                          id=""
                          value={dataFormEdit.state}
                          onChange={(e) =>
                            handleDataFormChange("state", e.target.value)
                          }
                        >
                          {checkboxesPriority.map((checkbox) => (
                            <option key={checkbox.value} value={checkbox.value}>
                              {checkbox.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="sub-section">
                    <div className="input-group">
                      <label htmlFor="">Thẻ</label>
                      <div className="input-focus-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Thẻ"
                          // onChange={handleChange}
                          // value={value}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <footer className="editFooter">
              <div className="wrap-btns">
                <button
                  className="editBtns"
                  id="editCancel"
                  onClick={handleBack}
                >
                  Hủy
                </button>
                <button
                  disabled={isCallingApiEdit}
                  className="editBtns"
                  id="editSave"
                  onClick={() => handleSubmitFormEdit()}
                >
                  Lưu
                </button>
              </div>
            </footer>
          </>
        ) : (
          <>
            <div className="header">
              <h4>Name todo</h4>
              <button className="btn" id="edit" onClick={handleToogleEdit}>
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button className="btn exit" id="" onClick={handleHideOption}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <section className="mb-0">
              <div className="panel-body">
                <div
                  className="sub-secion d-flex px-3 mt-2"
                  id="single-views-actions"
                >
                  <div className="dropdown-pane-container ">
                    <button className="button dropdown default exportBtn">
                      Export
                      <i className="icon-font tc-icon-arrow-drop-down "></i>
                    </button>
                    <div
                      id="todo-drop-down-pane"
                      className="dropdown-pane w-auto left "
                    >
                      {/* <ul className="dropdown-list" >
                        <li id="todo-export-bcf">Export to BCF</li>
                        <li id="todo-export-excel">Export to Excel</li>
                      </ul> */}
                    </div>
                  </div>
                  <span className="mx-2">
                    <button
                      className="button icon-medium tertiary icon-circle "
                      type="button"
                      data-cy="icon-button"
                    >
                      <i className="bi bi-tag-fill"></i>
                    </button>
                  </span>
                  <button
                    onClick={() => handleDeleteToDo()}
                    className="button icon-medium tertiary icon-circle "
                    type="button"
                    data-cy="icon-button"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                  <div className="dropdown-pane-container connect-dropdown-menu m-width-0">
                    <button
                      className="dropdownpane-link button icon-medium tertiary icon-cirlce"
                      data-cy="ddMenuIcon"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>
                </div>
                <div className="sub-section">
                  <div className="section-header">
                    <h5>Details</h5>
                  </div>
                  <div className="section-details">
                    <div className="label-group">
                      <label>Description</label>
                      <div className="value no-ellipsis text-prewrap">
                        {data.descriptions ?? "--"}
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Due date: </label>
                      <div className="value ">
                        {data.created_at ? formatDate(data.finish_date) : "--"}
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Type</label>
                      <div className="value ">--</div>
                    </div>
                    <div className="label-group">
                      <label>Priority</label>
                      <div className="value ">
                        <i className="icon-font i16 tc-icon-circle normal"></i>
                        {getStateLabel(data.priorities)}
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Status</label>
                      <div className="value ">
                        {data.status ? getStatusLabel(data.status) : "--"}
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Completion %</label>
                      <div className="value ">--</div>
                    </div>
                    <div className="label-group">
                      <label>Assigned To</label>
                      <div className="value">
                        {/* <ul className="flex-row-wrap">--</ul> */}
                        <div className="value ">--</div>
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Created</label>
                      <div className="value ">
                        {`${formatDate(data.created_at)} By ${
                          data.user_create.email
                        }`}
                      </div>
                    </div>
                    <div className="label-group">
                      <label>Modified</label>
                      <div className="value ">
                        {`${formatDate(data.updated_at)} By ${
                          data.user_create.email
                        }`}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sub-section">
                  <div className="section-header group pad-right-todo">
                    <h5>Attachments</h5>
                    <div className="flex-row">
                      <button
                        className="button icon-medium tertiary icon-circle"
                        type="button"
                        data-cy="icon-button"
                      >
                        <i className="icon-font bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-muted px-2">
                    This ToDo doesn't have any attachments.
                  </p>
                </div>
              </div>
            </section>

            <footer className="p-0 footerInfoFol">
              {isActive ? (
                <div className="comments">
                  <div className="add-comment-section active">
                    <div id="add-comment-wrapper" className="px-2">
                      <div
                        id="comment-container"
                        className="comment-support"
                      ></div>
                      <div className="relative">
                        <textarea
                          id="comment-add"
                          className="comment-add"
                          placeholder="Add a comment..."
                          maxLength={1024}
                          name="content"
                          onChange={onChangeComment}
                        ></textarea>
                        <div className="line"></div>
                      </div>
                      <ul className="list mb-1" id="attachment-list"></ul>
                    </div>
                    <div className="row-distribute px-2 py-2">
                      <div className="d-flex">
                        <button
                          className="button link-secondary"
                          id="cancelCmt"
                          onClick={cancelCmt}
                        >
                          Hủy
                        </button>
                        <button
                          className="button bg-primary text-light ms-2"
                          id="createCmt"
                          onClick={createCmt}
                        >
                          Bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="comments" onClick={showCmt}>
                  <div className="add-comment-section inactive">
                    <i className="bi bi-chat-right-dots-fill"></i>
                    <textarea
                      name=""
                      id="comment-add"
                      className="comment-add mt-1"
                      placeholder="Thêm bình luận..."
                    ></textarea>
                  </div>
                </div>
              )}
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default DetailTodo;
