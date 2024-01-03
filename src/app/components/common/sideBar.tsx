import Link from "next/link";
import nav from "../dataSideBar";
export default function SideBar() {
  return (
    <>
      <div id="leftNav">
        <ul className="nav flex-column">
          {nav.map((data) => (
            <li className="nav-item" id={`${data.id}`}>
              <Link className="anchor" href={data.link}>
                <i className={`${data.icon}`}></i>
                {data.title}
              </Link>
              {data.hasSubNav && (
                <ul className="subSetting">
                  {data.subNav.map((sub) => (
                    <li>
                      <Link className="anchor" href={sub.link}>
                        <i className={sub.icon}></i>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {/* <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="anchor" href={"/project/"}>
              <i className="bi bi-folder-fill"></i>Dữ liệu
            </Link>
          </li>

          <li className="nav-item">
            <Link className="anchor" href={"/project/activity"}>
              <i className="bi bi-clock-history"></i>Hoạt động
            </Link>
          </li>

          <li className="nav-item">
            <Link className="anchor" href={"/project/team"}>
              <i className="bi bi-people-fill"></i>Đội nhóm
            </Link>
          </li>

          <li className="nav-item">
            <Link className="anchor" href={"/project/todo"}>
              <i className="bi bi-clipboard-check-fill"></i>Việc cần làm
            </Link>
          </li>

          <li className="nav-item pl-1" id="setting">
            <i className="bi bi-gear-fill"></i>
            {"Cài đặt"}
            <i className=""></i>
            <ul className="subSetting">
              <li>
                <Link className="anchor" href={"/project/project-detail"}>
                  <i className="bi bi-body-text"></i>Chi tiết dự án
                </Link>
              </li>
              <li>
                <Link className="anchor" href={"/project/tags"}>
                  <i className="bi bi-tags-fill"></i>Thẻ
                </Link>
              </li>
              <li>
                <Link className="anchor" href={"/project/permission"}>
                  <i className="bi bi-key-fill"></i>Quyền cấp phép
                </Link>
              </li>
            </ul>
          </li>
        </ul> */}
      </div>
    </>
  );
}
