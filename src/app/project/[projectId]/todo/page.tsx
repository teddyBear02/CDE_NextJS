"use client";
import { useEffect, useState } from "react";
import { SubNav, NoneTodo, DetailTodo } from "@/components";
import { postTodo, getTodo } from "@/service/project/todoService";
import {
  PostComment,
  GetComment,
  UpdateComment,
  DeleteComment,
} from "@/service/project/commentService";
import { Button, Form, FormControl } from "react-bootstrap";
import CustomDropdown from "@/until/CustomDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "@/config/varenv";
import { formatDate } from "@/until/Helper";
import { getUserActivities } from "@/service/project/ActivitiesService";

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
export default function Todo() {
  const token: any = env.TOKEN;

  const [exportExcel, setExportExcel] = useState(false);
  const [dataToDo, setDataToDo] = useState<any[]>([]);
  const [dataDetailTodo, setDataDetailTodo] = useState<any[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<any>([]);
  const [dataFormCreate, setDataFormCreate] = useState({
    assginTo: "",
    title: "",
    descriptions: "",
    state: 1,
    status: 1,
    startDate: new Date(),
    finishDate: new Date(),
  });
  const [isCallingApiCreate, setIsCallingApiCreate] = useState(false);

  let project_id = localStorage.getItem("project_id");

  const [showModalCreateTodo, setShowModalCreateTodo] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [ownerType, setOwnerType] = useState<any>([]);
  const [statusTypes, setStatusTypes] = useState<any>([]);
  const [priorityTypes, setPriorityTypes] = useState<any>([]);
  const [selectedCheckboxDate, setSelectedCheckboxDate] = useState<string>("");
  const [listUserActivity, setListUserActivity] = useState<any[]>([]);
  const [searchTermUser, setSearchTermUser] = useState("");

  const [listComments, setListComments] = useState<any[]>([]);

  const [idTodo, setIdToDo] = useState<any>(0);

  const filteredUsers = listUserActivity.filter(
    (item) =>
      item.user.name.toLowerCase().includes(searchTermUser.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchTermUser.toLowerCase())
  );
  const handleCheckboxUserChange = (userId: any) => {
    if (checkedUsers.includes(userId)) {
      setCheckedUsers(checkedUsers.filter((id: any) => id !== userId));
    } else {
      setCheckedUsers([...checkedUsers, userId]);
    }
  };
  const handleChangeSearchUser = (event: any) => {
    setSearchTermUser(event.target.value);
  };
  const getAllActive = async () => {
    let params = "?";
    if (ownerType.length > 0) {
      params += `&owns=${ownerType.join(",")}`;
    }
    if (checkedUsers.length > 0) {
      params += `&user_id=${checkedUsers.join(",")}`;
    }
    if (statusTypes.length > 0) {
      params += `&status=${statusTypes.join(",")}`;
    }
    if (priorityTypes.length > 0) {
      params += `&priorities=${priorityTypes.join(",")}`;
    }
    if (
      searchDate.startDate &&
      searchDate.endDate &&
      selectedCheckboxDate !== ""
    ) {
      const startDateString = encodeURIComponent(
        searchDate.startDate.toISOString()
      );
      const endDateString = encodeURIComponent(
        searchDate.endDate.toISOString()
      );
      params = `&start_date=${startDateString}&finish_date=${endDateString}`;
    }
    if (!exportExcel) {
      const response = await getTodo(token, project_id, params);
      setDataToDo(response);
    } else {
      // params += "&export=1";
      // const response = await getActivities(token, project_id, params);
      // const linkExport = response.metadata;
      // setExportExcel(false)
      // window.open(linkExport, "_blank");
    }
  };
  const getUserActive = async () => {
    const response = await getUserActivities(token, project_id);
    setListUserActivity(response.metadata);
  };
  useEffect(() => {
    getUserActive();
  }, []);
  const [searchDate, setSearchDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleCheckboxOwnerTypeChange = (value: any) => {
    if (ownerType.includes(value)) {
      setOwnerType(ownerType.filter((type: any) => type !== value));
    } else {
      setOwnerType([...ownerType, value]);
    }
  };
  const handleCheckboxStatusChange = (value: any) => {
    if (statusTypes.includes(value)) {
      setStatusTypes(statusTypes.filter((type: any) => type !== value));
    } else {
      setStatusTypes([...statusTypes, value]);
    }
  };

  const handleCheckboxPriorityChange = (value: any) => {
    if (priorityTypes.includes(value)) {
      setPriorityTypes(priorityTypes.filter((type: any) => type !== value));
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

  function handleShowDetailToDo(idToDo: string) {
    const dataDetail = dataToDo.find((item) => item.id === idToDo);
    setIdToDo(idToDo);
    setDataDetailTodo(dataDetail);
    setShowDetail(true);
  }

  function handleFinishEditDetailToDo() {
    setShowDetail(false);
    getAllToDo();
  }
  const handleDataCreateFormChange = (
    key: string,
    value: string | number | Date | null
  ) => {
    setDataFormCreate((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleCreateTodo = async () => {
    if (
      !dataFormCreate.title ||
      !dataFormCreate.startDate ||
      !dataFormCreate.finishDate
    ) {
      //validate
      return;
    }
    setIsCallingApiCreate(true);
    const response = await postTodo(token, project_id, dataFormCreate);
    if (response.title) {
      getAllToDo();
    }
    setShowModalCreateTodo(false);
    setIsCallingApiCreate(false);
  };
  const getAllToDo = async () => {
    const response = await getTodo(token, project_id);
    setDataToDo(response);
  };

  useEffect(() => {
    getAllActive();
  }, [priorityTypes, statusTypes, exportExcel, listUserActivity, ownerType]);

  useEffect(() => {
    getAllToDo();
  }, []);
  return (
    <>
      <div className="container showFolder">
        <SubNav
          titleNav="Việc cần làm"
          btnTitle="Tạo mới"
          event={() => setShowModalCreateTodo(true)}
          showBtn={false}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
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
                onClick={() => handleCheckboxOwnerTypeChange(checkbox.value)}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  checked={ownerType.includes(checkbox.value)}
                  onChange={() => handleCheckboxOwnerTypeChange(checkbox.value)}
                />
                <div style={{ textAlign: "left", width: "80%" }}>
                  {checkbox.label}
                </div>
              </div>
            ))}
          </CustomDropdown>

          <CustomDropdown label="Groups">
            <Form>
              <FormControl
                type="text"
                style={{ width: "250px" }}
                placeholder="Search"
                className="mr-sm-2"
                value={searchTermUser}
                onChange={handleChangeSearchUser}
              />
            </Form>
            {filteredUsers.map((item) => (
              <div
                key={item.user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxUserChange(item.user.id)}
              >
                <Form.Check
                  type="checkbox"
                  className="mx-2"
                  name={item.user.id.toString()}
                  checked={checkedUsers.includes(item.user.id)}
                  onChange={(e) => e.stopPropagation()}
                />
                <div style={{ width: "90%", textAlign: "left" }}>
                  <div>{item.user.name}</div>
                  <div>{item.user.email}</div>
                </div>
              </div>
            ))}
          </CustomDropdown>
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
                  onChange={() => handleCheckboxStatusChange(checkbox.value)}
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
                onClick={() => handleCheckboxPriorityChange(checkbox.value)}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  checked={priorityTypes.includes(checkbox.value)}
                  onChange={() => handleCheckboxPriorityChange(checkbox.value)}
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
                    <i style={{ fontSize: "30px" }} className="bi bi-x"></i>
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
                <div style={{ width: "90%", textAlign: "left" }}>Yesterday</div>
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
                <div style={{ width: "90%", textAlign: "left" }}>Today</div>
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

        {dataToDo && dataToDo.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Người tạo</th>
                <th scope="col">Thời gian tạo</th>
                <th scope="col">Sửa đổi</th>
                <th scope="col">Ưu tiên</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {dataToDo.map((data: any) => (
                <tr
                  className="hoverList todoList"
                  style={{
                    borderBottom: "1px solid #ccc",
                    padding: "0px 1rem",
                  }}
                  key={data.id}
                  id={data.id}
                  onClick={() => handleShowDetailToDo(data?.id)}
                >
                  <td className="icon">
                    <i className="bi bi-clipboard-check-fill"></i>
                  </td>
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
          createCmt={() => {}}
          onChangeComment={() => {}}
        />
      )}

      {showModalCreateTodo && (
        <div className="modalCreateFolder">
          <div
            className="boxModal scrollable"
            style={{ height: "500px" }}
            id="modalTodo"
          >
            <div className="header">
              <h3>Tạo việc cần làm</h3>
              <button onClick={() => setShowModalCreateTodo(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div id="content" className="middleContent ">
              <form id="detail">
                <label>Tên việc cần làm:</label>
                <input
                  type="text"
                  placeholder="Việc cần làm"
                  name="name"
                  onChange={(event) =>
                    handleDataCreateFormChange("title", event.target.value)
                  }
                />
                <label htmlFor="">Gửi cho</label>
                <div className="input-focus-group">
                  <input
                    type="email"
                    onChange={(event) =>
                      handleDataCreateFormChange("assginTo", event.target.value)
                    }
                    value={dataFormCreate.assginTo}
                  />
                </div>
                <label>Ngày bắt đầu:</label>
                <ReactDatePicker
                  className="w-full"
                  selected={dataFormCreate.startDate}
                  onChange={(date) =>
                    handleDataCreateFormChange("startDate", date)
                  }
                />
                <label>Ngày kết thúc:</label>
                <ReactDatePicker
                  className="w-full"
                  selected={dataFormCreate.finishDate}
                  onChange={(date) =>
                    handleDataCreateFormChange("finishDate", date)
                  }
                />
                <label>Miêu tả</label>
                <div className="input-focus-group">
                  <textarea
                    onChange={(event) =>
                      handleDataCreateFormChange(
                        "descriptions",
                        event.target.value
                      )
                    }
                    value={dataFormCreate?.descriptions}
                  ></textarea>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-sm-6 ">
                    <label htmlFor="">Trạng thái </label>
                    <div className="input-focus-group">
                      <select
                        value={dataFormCreate.status}
                        onChange={(e) =>
                          handleDataCreateFormChange("status", e.target.value)
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

                  <div className="col-12 col-sm-6 ">
                    <label htmlFor="">Ưu tiên </label>
                    <div className="input-focus-group">
                      <select
                        name=""
                        id=""
                        value={dataFormCreate.state}
                        onChange={(e) =>
                          handleDataCreateFormChange("state", e.target.value)
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
              </form>
            </div>

            <div id="footer">
              <hr />
              <div className="wrap-btn">
                <button
                  className="cancel"
                  onClick={() => setShowModalCreateTodo(false)}
                >
                  Hủy
                </button>
                <Button
                  className="create"
                  disabled={isCallingApiCreate}
                  type="submit"
                  onClick={() => handleCreateTodo()}
                >
                  Tạo mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
