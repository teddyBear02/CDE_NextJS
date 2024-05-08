"use client";
import React, { useState, useEffect } from "react";
import { SubNav, ListUser, ModalInvite, UserDetail } from "@/app/components";
import {
  getInforTeam,
  SendMail,
  DeleteUser,
  ChangeRole,
} from "@/service/project/teamService";

import CheckRole from "@/service/project/checkRole";

import { env } from "@/config/varenv";

export default function Team() {
  let token: any = env.TOKEN;

  let project_id: any = localStorage.getItem("project_id");

  let user_id: any = localStorage.getItem("user_id");

  const [showDetail, setShowDetail] = useState(false);

  const [showModalInvite, setShowModalInvite] = useState(false);

  const [data, setData] = useState<any>([]);

  const [userInfor, setUserInfor] = useState();

  const [role, setRole] = useState(0);

  const handleGetUserId = (e: React.MouseEvent) => {
    let currVal = (e.currentTarget.closest(".table-list-item") as HTMLElement)
      ?.id;

    let nameUser: any = e.currentTarget.querySelector(".userName")?.textContent;
    setUserInfor(nameUser);
    setShowDetail(true);
    localStorage.setItem("user_id", currVal);
  };

  //.....................GET Member in Project.....................//

  useEffect(() => {
    getInforTeam(token, project_id).then((response: any) => {
      setData(response.data.metadata);
    });
  }, []);

  //....................Send Email...........................//

  const [infoInvite, setInfoInvite] = useState({
    email: "",
    role: role,
    project_id: project_id,
  });

  const handleSendInvite = () => {
    SendMail(token, infoInvite);
    setShowModalInvite(false);
  };

  //....................Delete user...........................//

  const handleDeleteUser = () => {
    DeleteUser(token, project_id, user_id);
    setShowDetail(false);

    const indexToRemove = data.findIndex(
      (item: any) => item.id === parseInt(user_id)
    );

    if (indexToRemove !== -1) {
      data.splice(indexToRemove, 1);
    }
  };

  //......................Change Role User......................//

  const [checkRole, setCheckRole] = useState<boolean>();

  const getInfor = async () => {
    const response = await CheckRole(token, project_id);

    if (response.role == 1) {
      setCheckRole(true);
    } else {
      setCheckRole(false);
    }
  };

  useEffect(() => {
    getInfor();
  }, []);

  const handleChange = (e: any) => {
    let val = e.target?.value;
    if (val === "Admin" && checkRole === true) {
      ChangeRole(token, project_id, user_id, "1");
    } else if (val === "User" && checkRole === true) {
      ChangeRole(token, project_id, user_id, "0");
    }
  };

  return (
    <>
      <div className="container showFolder">
        <SubNav
          titleNav="Đội nhóm"
          btnTitle="Thêm thành viên "
          event={() => setShowModalInvite(true)}
          showBtn={false}
        />
        <div className="panelWrapper">
          <div className="panelLeft">
            <div className="listPanel">
              <div className="listHeader">
                <h3>Đội nhóm</h3>
                <button>Nhóm mới</button>
              </div>
              <div className="listWrapper">
                <div className="sub-section">
                  <ul className="list">
                    <li className="listItem">
                      <div className="label-group">
                        <div className="value">
                          <p>Thành viên dự án</p>
                        </div>
                        <label htmlFor="">1 User</label>
                      </div>
                    </li>
                  </ul>
                </div>
                <h6 className="px-2">Nhóm</h6>
                <div className="sub-section ">
                  <p className="px-2">Không tìm thấy nhóm nào </p>
                </div>
              </div>
            </div>
          </div>
          <div className="panelRight">
            <div className="tableSection">
              <div className="tablePanel">
                <div className="tableHeader">
                  <h3>Thành viên trong dự án</h3>
                  <div className="panelControl"></div>
                </div>
                <div className="tableWrapper">
                  <div className="tableList">
                    {typeof data !== "undefined" ? (
                      <ListUser data={data} handleClick={handleGetUserId} />
                    ) : (
                      <ListUser />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetail && (
        <UserDetail
          user_name={userInfor}
          handleClose={() => setShowDetail(false)}
          deleteUser={handleDeleteUser}
          changeRole={handleChange}
        />
      )}

      {showModalInvite && (
        <ModalInvite
          closeModal={() => setShowModalInvite(false)}
          inviteUser={handleSendInvite}
          handleOnChange={setRole}
          role_id={role}
          OnchangeInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInfoInvite({ ...infoInvite, email: e.target.value })
          }
        />
      )}
    </>
  );
}
