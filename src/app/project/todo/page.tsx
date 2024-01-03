import { SubNav } from "@/app/components";
export default function Todo() {
  const propsSubNav = {
    titleNav: "Việc cần làm",
    disabel: false,
    btnTitle: "Tạo mới",
  };
  return (
    <>
      <div className="container showFolder">
        <SubNav params={propsSubNav} />
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
                <span>Priority</span> <i className="bi bi-caret-down-fill"></i>
              </div>
              <div className="filter">
                <span>Date modified</span>
                <i className="bi bi-caret-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
