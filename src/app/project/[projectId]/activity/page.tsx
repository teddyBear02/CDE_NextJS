"use client";
import { useEffect, useState } from "react";
import { SubNav, None, ListActivities } from "@/app/components";
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
  let arr: any = [1];

  const [listActivity, setListActivity] = useState<any[]>([]);
  const [listUserActivity, setListUserActivity] = useState<any[]>([]);
  const [searchTermUser, setSearchTermUser] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectedCheckboxDate, setSelectedCheckboxDate] = useState<string>("");
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
  const handleCheckboxActivityChange = (event) => {
    const { name, checked } = event.target;
    setActivity((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleChangeSearchUser = (event) => {
    setSearchTermUser(event.target.value);
  };

  const handleCheckboxUserChange = (event) => {
    const userId = parseInt(event.target.name);
    if (event.target.checked) {
      setCheckedUsers([...checkedUsers, userId]);
    } else {
      setCheckedUsers(checkedUsers.filter((id) => id !== userId));
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
    if (checkedUsers.length > 0) {
      const userIds = checkedUsers.join(","); 
      params += `&user_id=${userIds}`;
    }
    if (
      searchDate.startDate &&
      searchDate.endDate &&
      selectedCheckboxDate !== ""
    ) {
      console.log(searchDate.startDate, searchDate.endDate);
      const startDateString = encodeURIComponent(
        searchDate.startDate.toISOString()
      );
      const endDateString = encodeURIComponent(
        searchDate.endDate.toISOString()
      );
      params = `&start_date=${startDateString}&finish_date=${endDateString}`;
    }
    params += queryString ? `&type=${queryString}` : "";
      const response = await getActivities(token, project_id, params);
      setListActivity(response.metadata);   
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

  useEffect(() => {
    getUserActive();
  }, []);
  useEffect(() => {
    getAllActive();
    console.log("All active");
  }, [activity, selectedCheckboxDate, checkedUsers]);

  const debouncedHandleChange = debounce((term) => {
    console.log(term);
  }, 500);

  const handleChangeValueSearchUser = (event) => {
    const term = event.target.value;
    setSearchTermUser(term);
    debouncedHandleChange(searchTermUser);
  };
  const propsNone = {
    title: "Hiện không có hoạt động nào",
    subTitle: "Hãy thay đổi trong dự án",
  };
  return (
    <div className="container showFolder">
      <SubNav titleNav="Hoạt động" btnTitle="Xuất ra PDF" />
      <div className="toolbar-section">
        <div className="filtersWrapper">
          <div className="filtersContianer">
            <CustomDropdown label="Activity Type">
              <Form.Check
                style={{ marginLeft: "2px" }}
                type="checkbox"
                label="Dự án"
                name="project"
                checked={activity.project}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                style={{ marginLeft: "2px" }}
                type="checkbox"
                label="Tệp"
                name="file"
                checked={activity.file}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                type="checkbox"
                label="Thư mục"
                name="folder"
                checked={activity.folder}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                style={{ marginLeft: "2px" }}
                type="checkbox"
                label="Bình luận"
                name="comment"
                checked={activity.comment}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                style={{ marginLeft: "2px" }}
                type="checkbox"
                label="Tag"
                name="tag"
                checked={activity.tag}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                style={{ marginLeft: "2px" }}
                type="checkbox"
                label="Đội nhóm"
                name="team"
                checked={activity.team}
                onChange={handleCheckboxActivityChange}
              />
              <Form.Check
                type="checkbox"
                label="Cần làm"
                name="todo"
                checked={activity.todo}
                onChange={handleCheckboxActivityChange}
              />
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
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    className="mx-2"
                    name={item.user.id.toString()}
                    checked={checkedUsers.includes(item?.user?.id)}
                    onChange={handleCheckboxUserChange}
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
          </div>
        </div>
      </div>

      <div className="container">
        {listActivity.length >= 1 ? (
          <ListActivities data={listActivity} />
        ) : (
          <None params={propsNone} />
        )}
      </div>
    </div>
  );
}
