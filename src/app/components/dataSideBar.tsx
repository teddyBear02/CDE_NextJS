let nav = [
  {
    icon: "bi bi-folder-fill",
    title: "Dữ liệu",
    link: `/project/data`,
  },

  {
    icon: "bi bi-clock-history",
    title: "Hoạt động",
    link: "/project/activity",
  },

  {
    icon: "bi bi-clipboard-check-fill",
    title: "Việc cần làm",
    link: "/project/todo",
  },

  {
    icon: "bi bi-people-fill",
    title: "Đội nhóm",
    link: "/project/team",
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
        link: "/project/project-detail",
      },

      {
        icon: "bi bi-tags-fill",
        title: "Thẻ",
        link: "/project/tags",
      },

      {
        icon: "bi bi-key-fill",
        title: "Quyền cấp phép",
        link: "/project/privacy",
      },
    ],
  },
];

export default nav;
