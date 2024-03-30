import React from "react";

interface Props {
  closeModal: any;
  inviteUser: any;
  handleOnChange: any;
  role_id: any;
  OnchangeInput: any;
}

const roles = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 0,
    name: "User",
  },
];

function ModalInvite({
  closeModal,
  inviteUser,
  handleOnChange,
  role_id,
  OnchangeInput,
}: Props) {
  return (
    <>
      <div className="modalCreateFolder">
        <div className="boxModal" id="modalInvite">
          {/*...........................Header .......................*/}

          <div className="header">
            <h3>Mời người khác vào trong dự án</h3>
            <button onClick={closeModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/*...........................Middle .......................*/}

          <div className="middleContent">
            <div className="input">
              <input
                type="email"
                name="email"
                placeholder="Thêm người khác bằng email"
                onChange={OnchangeInput}
              />
            </div>

            <div className="input-group checkradio mb-0">
              <label>Role</label>
              <div className="row">
                {roles.map((role: any) => (
                  <div className="group-items mr-0 col-2" key={role.id}>
                    <div className="icon radio">
                      <input
                        className="custom-input"
                        name={`${role.name}`}
                        id={`${role.name}`}
                        type="radio"
                        checked={role_id === role.id}
                        onChange={() => handleOnChange(role.id)}
                      />
                      <label></label>
                    </div>
                    <label htmlFor={`${role.name}`}>{role.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
          </div>

          {/*...........................Footer .......................*/}

          <div className="footer">
            <div className="wrap-btn">
              <button className="cancel" onClick={closeModal}>
                Hủy
              </button>
              <button className="create" type="submit" onClick={inviteUser}>
                Tạo mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalInvite;
