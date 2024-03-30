import SubNav from "../../common/subNav";

interface Props {
  onSaveChange: any;
  onChangeTodo: any;
  onChangeInvite: any;
  todoChoice: any;
  inviteChoice: any;
}

export default function Privacy({
  onSaveChange,
  onChangeTodo,
  onChangeInvite,
  todoChoice,
  inviteChoice,
}: Props) {
  return (
    <>
      <div className="container showFolder">
        <SubNav
          titleNav="Quyền truy cập"
          btnTitle="Lưu thay đổi"
          event={onSaveChange}
        />
        <div className="container showFolder">
          <div className="boxPermission mb-4" id="todoVisual">
            <div className="headerPermisson">{"Hiển thị việc cần làm"}</div>
            <div className="row">
              <div className="col">
                <p>Chọn cách mà người dùng có thể thấy việc cần làm</p>
              </div>
              <div className="col">
                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name="todo_permission"
                      id="0"
                      checked={todoChoice === 0}
                      className="custom-input inp-todo"
                      onChange={onChangeTodo}
                    />
                  </div>
                  <label htmlFor="">
                    {"Hiển thị việc cần làm (Mặc định)"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị toàn bộ với những người trong dự
                      án
                    </p>
                  </label>
                </div>

                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name="todo_permission"
                      id="1"
                      checked={todoChoice === 1}
                      className="custom-input inp-todo"
                      onChange={onChangeTodo}
                    />
                  </div>
                  <label htmlFor="">
                    {"Chỉ định hiển thị việc cần làm"}
                    <p className="small text-meta">
                      Việc cần làm sẽ hiển thị đối với quản trị viên, người tạo
                      và những người được cấp phép
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="boxPermission" id="projectIvitations">
            <div className="headerPermisson">{"Mời thành viên dự án"}</div>
            <div className="row">
              <div className="col">
                <p>Chọn người có thể mời người khác vào dự án</p>
              </div>
              <div className="col">
                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name="invite_permission"
                      id="0"
                      className="custom-input inp-invite"
                      checked={inviteChoice === 0}
                      onChange={onChangeInvite}
                    />
                  </div>
                  <label htmlFor="">
                    {"Cho phép tất cả người dùng mời người khác vào dự án"}
                  </label>
                </div>

                <div className="group-items">
                  <div className="radio">
                    <input
                      type="radio"
                      name="invite_permission"
                      id="1"
                      className="custom-input inp-invite"
                      checked={inviteChoice === 1}
                      onChange={onChangeInvite}
                    />
                  </div>
                  <label htmlFor="">
                    {"Chỉ cho phép quản trị viên mời người khác"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
