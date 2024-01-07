import { NoneTodo, SubNav, TodoList } from "@/app/components";

interface Props {
  data: any;
}

export default function Todo({ data }: Props) {
  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Việc cần làm" btnTitle="Tạo mới" />
        <div className="container showFolder">
          <div className="toolbar-section">
            <div className="filtersWrapper">
              <div className="filtersContianer">
                <div className="filter">
                  <span>Owner</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Users</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Groups</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Status</span> <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Priority</span>{" "}
                  <i className="bi bi-caret-down-fill"></i>
                </div>
                <div className="filter">
                  <span>Date modified</span>
                  <i className="bi bi-caret-down-fill"></i>
                </div>
              </div>
            </div>
          </div>
          {data != undefined || data != null ? (
            <TodoList
              title="Tiêu đề"
              user="Người tạo"
              timeCreate="Thời gian tạo"
              timeModified="Sửa đổi"
              state="Ưu tiên"
              status="Trạng thái"
              data={data}
            />
          ) : (
            <NoneTodo />
          )}
        </div>
      </div>
    </>
  );
}
