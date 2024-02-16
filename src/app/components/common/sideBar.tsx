import Link from "next/link";
interface Props {
  projectId: string;
}
export default function SideBar({ projectId }: Props) {
  let nav = [
    {
      icon: "bi bi-folder-fill",
      title: "Dữ liệu",
      link: `/project/${projectId}/data`,
    },

    {
      icon: "bi bi-clock-history",
      title: "Hoạt động",
      link: `/project/${projectId}/activity`,
    },

    {
      icon: "bi bi-clipboard-check-fill",
      title: "Việc cần làm",
      link: `/project/${projectId}/todo`,
    },

    {
      icon: "bi bi-people-fill",
      title: "Đội nhóm",
      link: `/project/${projectId}/team`,
    },

    {
      icon: "bi bi-gear-fill",
      subIcon: "bi bi-caret-down-fill",
      id: "setting",
      title: "Cài đặt",
      hasSubNav: true,
      link: "",
      subNav: [
        {
          icon: "bi bi-body-text",
          title: "Chi tiết dự án",
          link: `/project/${projectId}/project-detail`,
        },

        {
          icon: "bi bi-tags-fill",
          title: "Thẻ",
          link: `/project/${projectId}/tags`,
        },

        {
          icon: "bi bi-key-fill",
          title: "Quyền cấp phép",
          link: `/project/${projectId}/privacy`,
        },
      ],
    },
  ];

  return (
    <>
      <div id="leftNav">
        <ul className="nav flex-column">
          {nav.map((data, index) => (
            <li className="nav-item" id={`${data.id}`} key={index}>
              <Link className="anchor" href={data.link}>
                <i className={`${data.icon}`}></i>
                {data.title}
              </Link>
              {data.hasSubNav && (
                <ul className="subSetting">
                  {data.subNav.map((sub, index) => (
                    <li key={index}>
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
