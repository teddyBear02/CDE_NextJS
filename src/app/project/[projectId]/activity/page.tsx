"use client";
import { useEffect, useState } from "react";
import { SubNav, None, ListActivities } from "@/app/components";
import { getActivities } from "@/service/project/ActivitiesService";
import { env } from "@/config/varenv";
export default function Activity() {
  let arr: any = [1];

  const [listActivity, setListActivity] = useState<any[]>([]);
  let project_id = localStorage.getItem("project_id");

  const token = env.TOKEN;

  const getAllActive = async () => {
    const response = await getActivities(token, project_id);
    setListActivity(response.metadata);
    console.log(response);
  };

  useEffect(() => {
    getAllActive();
  }, []);

  const propsNone = {
    title: "Hiện không có hoạt động nào",
    subTitle: "Hãy thay đổi trong dự án",
  };
  return (
    <>
      <>
        <div className="container showFolder">
          <SubNav titleNav="Hoạt động" btnTitle="Tạo mới" />
          <div className="toolbar-section">
            <div className="filtersWrapper">
              <div className="filtersContianer">
                <div className="filter">
                  <span>Activity Type</span>{" "}
                  <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Users</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Groups</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Date modified</span>{" "}
                  <i className="bi bi-caret-down-fill"></i>
                </div>
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
      </>
    </>
  );
}
