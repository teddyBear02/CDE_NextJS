"use client";
import { useEffect, useState } from "react";
import { None, ListActivities } from "@/app/components";
import {
  getActivities,
  getUserActivities,
} from "@/service/project/ActivitiesService";
import { env } from "@/config/varenv";
import { Button, Form, FormControl } from "react-bootstrap";
import CustomDropdown from "@/app/until/CustomDropdown";
import { debounce } from "@/app/until/Helper";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const activityMapping = {
  project: "Project",
  file: "Files",
  folder: "Folder",
  comment: "Comment",
  tag: "Tag",
  team: "Teams",
  todo: "Todo",
};

export default function Activity() {
  const [listActivity, setListActivity] = useState<any[]>([]);
  const [listUserActivity, setListUserActivity] = useState<any[]>([]);
  const [searchTermUser, setSearchTermUser] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectedCheckboxDate, setSelectedCheckboxDate] = useState<string>("");
  const [exportExcel, setExportExcel] = useState(false);
  const [searchDate, setSearchDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  let project_id = localStorage.getItem("project_id");
  const token = env.TOKEN;

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
  const [activity, setActivity] = useState({
    project: false,
    file: false,
    folder: false,
    comment: false,
    tag: false,
    team: false,
    todo: false,
  });
  const handleCheckboxActivityChange = (name: string) => {
    setActivity((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const handleChangeSearchUser = (event) => {
    setSearchTermUser(event.target.value);
  };
  const handleCheckboxUserChange = (userId) => {
    if (checkedUsers.includes(userId)) {
      setCheckedUsers(checkedUsers.filter((id) => id !== userId));
    } else {
      setCheckedUsers([...checkedUsers, userId]);
    }
  };

  const filteredUsers = listUserActivity.filter(
    (item) =>
      item.user.name.toLowerCase().includes(searchTermUser.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchTermUser.toLowerCase())
  );
  const getAllActive = async () => {
    const queryStringParams = [];
    for (const key in activity) {
      if (activity.hasOwnProperty(key) && activity[key]) {
        queryStringParams.push(activityMapping[key]);
      }
    }
    const queryString = queryStringParams.join(",");
    let params = "";
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
    if (checkedUsers.length > 0) {
      const userIds = checkedUsers.join(",");
      params += `&user_id=${userIds}`;
    }
    params += queryString ? `&type=${queryString}` : "";
    if (!exportExcel) {
      const response = await getActivities(token, project_id, params);
      setListActivity(response.metadata);
    } else {
      params += "&export=1";
      const response = await getActivities(token, project_id, params);
      const linkExport = response.metadata;
      setExportExcel(false)
      window.open(linkExport, "_blank");
    }
  };
  const getUserActive = async () => {
    const response = await getUserActivities(token, project_id);
    console.log(response.metadata);
    setListUserActivity(response.metadata);
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
  const handleReset = () => {
    setActivity({
      project: false,
      file: false,
      folder: false,
      comment: false,
      tag: false,
      team: false,
      todo: false,
    });
    setCheckedUsers([]);
    setSelectedCheckboxDate("");
  };
  const handleExportExcel = () => {
    if (!exportExcel) {
      setExportExcel(true);
    }
  };
  useEffect(() => {
    getUserActive();
  }, []);
  useEffect(() => {
    getAllActive();
  }, [activity, selectedCheckboxDate, exportExcel]);

  const debouncedHandleChange = debounce((term) => {
    console.log(term);
  }, 500);

  // const handleChangeValueSearchUser = (event) => {
  //   const term = event.target.value;
  //   setSearchTermUser(term);
  //   debouncedHandleChange(searchTermUser);
  // };
  const propsNone = {
    title: "Hiện không có hoạt động nào",
    subTitle: "Hãy thay đổi trong dự án",
  };
  return (
    <div className="container showFolder">
      <div
        aria-disabled={exportExcel === false}
        onClick={() => setExportExcel(true)}
        className="px-2"
        style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
         }}
      >
      <div style={{fontSize: '30px' }}>Hoạt động</div>
      <div
        aria-disabled={exportExcel === false}
        onClick={() => setExportExcel(true)}
      >
        <Button
          variant="success"
          onClick={handleExportExcel}
          disabled={exportExcel}
        >
          Xuất Excel
        </Button>
      </div>
      </div>
      <div style={{
        display: "flex",
        width: '100%',
        alignItems: 'center'
       }} 
       className=" px-2">
            <CustomDropdown label="Activity Type">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("project")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="project"
                  checked={activity.project}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Dự án</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("file")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="file"
                  checked={activity.file}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Tệp</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("folder")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="folder"
                  checked={activity.folder}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Thư mục</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("comment")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="comment"
                  checked={activity.comment}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Bình luận</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("tag")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="tag"
                  checked={activity.tag}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Nhãn dán</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("team")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="team"
                  checked={activity.team}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Đội nhóm</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCheckboxActivityChange("todo")}
              >
                <Form.Check
                  style={{ marginLeft: "2px" }}
                  type="checkbox"
                  name="todo"
                  checked={activity.todo}
                />
                <div style={{ textAlign: "left", width: "70%" }}>Cần làm</div>
              </div>
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

      <div style={{overflowY: 'scroll', height: '500px' }}>
        {listActivity.length >= 1 ? (
          <ListActivities data={listActivity} />
        ) : (
          <None params={propsNone} />
        )}
      </div>
    </div>
  );
}
