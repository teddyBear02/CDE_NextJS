"use client";
import { useEffect, useState } from "react";
import {
  SubNav,
  ModalNewTodo,
  NoneTodo,
  DetailTodo,
} from "@/app/components";
import { postTodo, getTodo, deleteTodo } from "@/service/project/todoService";
import { PostComment } from "@/service/project/commentService";
import { Form } from "react-bootstrap";
import CustomDropdown from "@/app/until/CustomDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "@/config/varenv";
import { formatDate } from "@/app/until/Helper";

const checkboxesOwner = [
  { label: "Assigned to me", value: 1 },
  { label: "Created by me", value: 2 },
  { label: "Unassigned", value: 3 },
];
const checkboxesStatus = [
  { label: "New", value: 1 },
  { label: "In Progress", value: 2 },
  { label: "Waitting", value: 3 },
  { label: "Done", value: 4 },
  { label: "Close", value: 5 }
];
const checkboxesPriority = [
  { label: "Critical", value: 4 },
  { label: "High", value: 3 },
  { label: "Normal", value: 2 },
  { label: "Low", value: 1 },
];
export default function Todo() {
  const token = env.TOKEN;
  const [dataToDo, setDataToDo] = useState<any[]>([]);
  const [dataDetailTodo, setDataDetailTodo] = useState<any[]>([]);

  let project_id = localStorage.getItem("project_id");

  const [showModalTodo, setShowModalTodo] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [ownerType, setOwnerType] = useState([]);
  const [statusTypes, setStatusTypes] = useState([]);
  const [priorityTypes, setPriorityTypes] = useState([]);
  const [selectedCheckboxDate, setSelectedCheckboxDate] = useState<string>("");
  const [isCallingApiCreate, setIsCallingApiCreate] = useState(false);

  const [searchDate, setSearchDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleCheckboxOwnerTypeChange = (value) => {
    if (ownerType.includes(value)) {
      setOwnerType(ownerType.filter((type) => type !== value));
    } else {
      setOwnerType([...ownerType, value]);
    }
  };
  const handleCheckboxStatusChange = (value) => {
    if (statusTypes.includes(value)) {
      setStatusTypes(statusTypes.filter((type) => type !== value));
    } else {
      setStatusTypes([...statusTypes, value]);
    }
  };

  const handleCheckboxPriorityChange = (value) => {
    if (priorityTypes.includes(value)) {
      setPriorityTypes(priorityTypes.filter((type) => type !== value));
    } else {
      setPriorityTypes([...priorityTypes, value]);
    }
  };
  const handleDateChange = (
    date: Date | null,
    type:
      | "startDate"
      | "endDate"
      | "today"
      | "lastweek"
      | "yesterday"
      | "lastmonth"
  ) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    const dateMap: Record<string, { startDate: Date; endDate: Date }> = {
      today: { startDate: today, endDate: today },
      yesterday: { startDate: yesterday, endDate: yesterday },
      lastweek: { startDate: weekAgo, endDate: today },
      lastmonth: { startDate: monthAgo, endDate: today },
      startDate: { startDate: date || today, endDate: date || today },
      endDate: { startDate: date || today, endDate: date || today },
    };

    setSearchDate((prev) => ({
      ...prev,
      ...dateMap[type],
      ...(type === "startDate"
        ? { endDate: date && date > prev.endDate ? date : prev.endDate }
        : type === "endDate"
          ? { startDate: date && date < prev.startDate ? date : prev.startDate }
          : {}),
    }));
  };

  const handleCheckboxDateChange = (
    type:
      | "startDate"
      | "endDate"
      | "today"
      | "lastweek"
      | "yesterday"
      | "lastmonth"
  ) => {
    setSelectedCheckboxDate(type);
    handleDateChange(null, type);
  };
  const handleReset = () => {
    setOwnerType([]);
    setPriorityTypes([]);
    setStatusTypes([]);
  };
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
  function getLabelFromArray(value: string, array) {
    const item = array.find(item => item.value === value);
    return item ? item.label : '';
  }

  function getStatusLabel(statusValue: string) {
    return getLabelFromArray(statusValue, checkboxesStatus);
  }

  function getStateLabel(stateValue: string) {
    return getLabelFromArray(stateValue, checkboxesPriority);
  }

  function handleShowDetailToDo(idToDo : string) {
    const dataDetail = dataToDo.find(item => item.id === idToDo)
    setDataDetailTodo(dataDetail)
    setShowDetail(true)
  }

  function handleFinishEditDetailToDo() {
    setShowDetail(false)
    getAllToDo()
  }

  const [todoEdit, setTodoEdit] = useState({
    title: "",
    finish_date: "",
    start_date: "",
    project_id: project_id,
  });
  const getAllToDo = async () => {
    const response = await getTodo(token, project_id);
    if(response) setDataToDo(response)
  };
  const handleCreateTodo = async () => {
    if (!todoEdit.title || !todoEdit.start_date || !todoEdit.finish_date) {
      //validate
      return;
    }
    setIsCallingApiCreate(true)
    const response = await postTodo(token, todoEdit);
    if (response.title) getAllToDo()
    setShowModalTodo(false)
    setIsCallingApiCreate(false)
  };

  const [comment, setComment] = useState({
    type: "",
    another_id: "",
    content: "",
  });

  const handleComment = async () => {
    await PostComment(token, comment);
  };
  useEffect(() => { getAllToDo() }, [])
  return (
    <>
      <div className="container showFolder">
        <SubNav
          titleNav="Việc cần làm"
          btnTitle="Tạo mới"
          event={() => setShowModalTodo(true)}
        />
          <div style={{
            display: "flex",
            width: '100%',
            alignItems: 'center'
          }} >
            <CustomDropdown label="Owners">
              {checkboxesOwner.map((checkbox) => (
                <div
                  className="py-1"
                  key={checkbox.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "160px",
                    textAlign: "left",
                  }}
                  onClick={() =>
                    handleCheckboxOwnerTypeChange(checkbox.value)
                  }
                >
                  <Form.Check
                    style={{ marginLeft: "2px" }}
                    type="checkbox"
                    checked={ownerType.includes(checkbox.value)}
                    onChange={() =>
                      handleCheckboxOwnerTypeChange(checkbox.value)
                    }
                  />
                  <div style={{ textAlign: "left", width: "80%" }}>
                    {checkbox.label}
                  </div>
                </div>
              ))}
            </CustomDropdown>

            <div className="filter">
              <span>Users</span> <i className="bi bi-caret-down-fill"></i>
            </div>
            <div className="filter">
              <span>Groups</span> <i className="bi bi-caret-down-fill"></i>
            </div>
            <CustomDropdown label="Status">
              {checkboxesStatus.map((checkbox) => (
                <div
                  key={checkbox.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "160px",
                    textAlign: "left",
                  }}
                  onClick={() => handleCheckboxStatusChange(checkbox.value)}
                >
                  <Form.Check
                    style={{ marginLeft: "2px" }}
                    type="checkbox"
                    checked={statusTypes.includes(checkbox.value)}
                    onChange={() =>
                      handleCheckboxStatusChange(checkbox.value)
                    }
                  />
                  <div style={{ textAlign: "left", width: "80%" }}>
                    {checkbox.label}
                  </div>
                </div>
              ))}
            </CustomDropdown>
            <CustomDropdown label="Priority">
              {checkboxesPriority.map((checkbox) => (
                <div
                  key={checkbox.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "160px",
                    textAlign: "left",
                  }}
                  onClick={() =>
                    handleCheckboxPriorityChange(checkbox.value)
                  }
                >
                  <Form.Check
                    style={{ marginLeft: "2px" }}
                    type="checkbox"
                    checked={priorityTypes.includes(checkbox.value)}
                    onChange={() =>
                      handleCheckboxPriorityChange(checkbox.value)
                    }
                  />
                  <div style={{ textAlign: "left", width: "80%" }}>
                    {checkbox.label}
                  </div>
                </div>
              ))}
            </CustomDropdown>

            <CustomDropdown label="Date modified">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "200px",
                  padding: "4px",
                  textAlign: "left",
                }}
              >
                <div
                  className="mb-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Custom Date
                  {selectedCheckboxDate !== "customDate" && (
                    <div
                      onClick={() => {
                        setSelectedCheckboxDate("customDate");
                      }}
                    >
                      <i
                        style={{ fontSize: "30px" }}
                        className="bi bi-plus ml-2 "
                      ></i>{" "}
                    </div>
                  )}
                  {selectedCheckboxDate === "customDate" && (
                    <div
                      onClick={() => {
                        setSelectedCheckboxDate("");
                      }}
                    >
                      <i
                        style={{ fontSize: "30px" }}
                        className="bi bi-x"
                      ></i>
                    </div>
                  )}
                </div>
                {selectedCheckboxDate === "customDate" && (
                  <>
                    <div>From</div>
                    <ReactDatePicker
                      selected={searchDate.startDate}
                      onChange={(date) => {
                        if (date) {
                          handleDateChange(date, "startDate");
                        }
                      }}
                    />
                    <div>To</div>
                    <ReactDatePicker
                      selected={searchDate.endDate}
                      onChange={(date) => {
                        if (date) {
                          handleDateChange(date, "endDate");
                        }
                      }}
                    />
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "4px",
                  }}
                  onClick={() => {
                    if (selectedCheckboxDate === "yesterday")
                      setSelectedCheckboxDate("");
                    else handleCheckboxDateChange("yesterday");
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name="yesterday"
                    checked={selectedCheckboxDate === "yesterday"}
                  />
                  <div style={{ width: "90%", textAlign: "left" }}>
                    Yesterday
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (selectedCheckboxDate === "today")
                      setSelectedCheckboxDate("");
                    else handleCheckboxDateChange("today");
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name="today"
                    checked={selectedCheckboxDate === "today"}
                  />
                  <div style={{ width: "90%", textAlign: "left" }}>
                    Today
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (selectedCheckboxDate === "lastweek")
                      setSelectedCheckboxDate("");
                    else handleCheckboxDateChange("lastweek");
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name="lastweek"
                    checked={selectedCheckboxDate === "lastweek"}
                  />
                  <div style={{ width: "90%", textAlign: "left" }}>
                    Past 7 days
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (selectedCheckboxDate === "lastmonth")
                      setSelectedCheckboxDate("");
                    else handleCheckboxDateChange("lastmonth");
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name="lastmonth"
                    checked={selectedCheckboxDate === "lastmonth"}
                  />
                  <div style={{ width: "90%", textAlign: "left" }}>
                    Past 30 days
                  </div>
                </div>
                <div
                  onClick={() => {
                    setSelectedCheckboxDate("");
                  }}
                  className="my-2 mx-2"
                  style={{
                    color: "#0099FF",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  Reset
                </div>
              </div>
            </CustomDropdown>
            <div
              onClick={() => {
                handleReset();
              }}
              className="my-2 mx-2"
              style={{
                color: "#0099FF",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              Reset
            </div>
          </div>

          {(dataToDo && dataToDo.length > 0) ? (
            // <TodoList
            //   title="Tiêu đề"
            //   user="Người tạo"
            //   timeCreate="Thời gian tạo"
            //   timeModified="Sửa đổi"
            //   state="Ưu tiên"
            //   status="Trạng thái"
            //   data={dataTableTodo}
            //   handleClick={handleShowDetailToDo}
            // />
            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Người tạo</th>
                <th scope="col">Thời gian tạo</th>
                <th scope="col">Sửa đổi</th>
                <th scope="col">Ưu tiên</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}> 
                  <div className="table-wrapper scrollable"  style={{ overflowY: 'scroll', height: '400px' }}>
                    <table  style={{ width: '100%' }}>
                      <tbody className="table-group-divider">
                        {dataToDo.map((data: any) => (
                          <tr
                            className="hoverList todoList"
                            key={data.id}
                            id={data.id}
                            onClick={()=>
                              handleShowDetailToDo(data?.id)
                            }
                          >
                         {/*   <td className="icon">
                            <i className="bi bi-clipboard-check-fill"></i>
                        </td>   */} 
                            <td>{data.title}</td>
                            <td>{data.user_create.name}</td>
                            <td>{formatDate(data.created_at)}</td>
                            <td>{formatDate(data.updated_at)}</td>
                            <td>{getStateLabel(data.priorities)}</td>
                            <td>{getStatusLabel(data.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          ) : (
            dataToDo ?? <NoneTodo />
          )}
        </div>

      {showDetail && (
        <DetailTodo
          data={dataDetailTodo}
          isEdit={showEdit}
          handleBack={toggleEditClick}
          saveBtn={handleFinishEditDetailToDo}
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
          isCallingApi={isCallingApiCreate}
          closeModal={() => setShowModalTodo(false)}
          handleInputName={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, title: e.target.value });
          }}
          handleInputStart={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, start_date: e.target.value });
          }}
          handleInputEnd={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoEdit({ ...todoEdit, finish_date: e.target.value });
          }}
          createTodo={handleCreateTodo}
        />
      )}
    </>
  );
}