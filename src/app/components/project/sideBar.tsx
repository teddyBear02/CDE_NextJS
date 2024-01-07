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
      </div>
    </>
  );
}
