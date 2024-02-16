import { SubNav, None } from "@/app/components";

export default function Activity() {
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

          <None params={propsNone} />
        </div>
      </>
    </>
  );
}
