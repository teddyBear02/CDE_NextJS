import { SubNav } from "@/app/components";
export default function Team() {
  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Đội nhóm" btnTitle="Thêm thành viên " />
        <div className="panelWrapper">
          <div className="panelLeft">
            <div className="listPanel">
              <div className="listHeader">
                <h3>Groups</h3>
                <button>New Group</button>
              </div>
              <div className="listWrapper">
                <div className="sub-section">
                  <ul className="list">
                    <li className="listItem">
                      <div className="label-group">
                        <div className="value">
                          <p>All project members</p>
                        </div>
                        <label htmlFor="">1 User</label>
                      </div>
                    </li>
                  </ul>
                </div>
                <h6 className="px-2">CUSTOM GROUPS</h6>
                <div className="sub-section ">
                  <p className="px-2">No group found</p>
                </div>
              </div>
            </div>
          </div>
          <div className="panelRight">
            <div className="tableSection">
              <div className="tablePanel">
                <div className="tableHeader">
                  <h3>All project members</h3>
                  <div className="panelControl"></div>
                </div>
                <div className="tableWrapper">
                  <div className="tableList">
                    <div className="stickyHeaer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
