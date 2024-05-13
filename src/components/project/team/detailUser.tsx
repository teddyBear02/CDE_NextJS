import { ChangeRole } from "@/service/project/teamService";
import React from "react";
interface Props {
  handleClose: any;
  deleteUser: any;
  user_name: any;
  // user_email: any;
  changeRole: any;
}

function DetailUser({ handleClose, deleteUser, user_name, changeRole }: Props) {
  return (
    <>
      <div className="right" id="detail-user">
        <div className="header">
          <button className="btn">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <button className="btn exit" onClick={handleClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <section>
          <div className="sub-section preview px-2 py-2">
            <div className="thumbnailSection thumbnailDetails">
              <div className="bi bi-person-fill" id="user-icon"></div>
              <div className="mt-1 text-center">
                <h3>{user_name}</h3>
                <div>
                  <small></small>
                </div>
                <div className="text-ellipsis">
                  <a className="small" href={`mailto:`}></a>
                </div>
              </div>
            </div>
          </div>

          <div className="sub-section">
            <div className="section-header no-border">
              <h5>Details</h5>
            </div>
            <div className="section-details">
              <div className="label-group">
                <label>Last accessed</label>
                <div className="value ">Mar 28, 2024 08:32 AM</div>
              </div>
              <div className="label-group">
                <label>Status</label>
                <div className="value ">Active</div>
              </div>
              <div className="input-group">
                <label>Role</label>
                <select id="role" onChange={changeRole}>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sub-section">
            <div className="section-header group">
              <h5>Groups</h5>
              <div>
                <button id="add-to-group" className="button link-primary">
                  +Add to Group(s)
                </button>
              </div>
            </div>
            <div className="section-details">
              <p className="text-muted">This user is not in any groups</p>
            </div>
          </div>
        </section>

        <footer className="">
          <div className="wrap-buttons px-2 py-2 mx-0">
            <button
              className="button tertiary text_col_red ml-0 full-width"
              onClick={deleteUser}
            >
              Remove from project
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default DetailUser;
