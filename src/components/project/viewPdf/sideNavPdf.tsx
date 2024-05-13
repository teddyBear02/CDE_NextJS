export default function sideNavPdf() {
  let icons = [
    {
      name: "bi bi-info-circle-fill",
    },

    {
      name: "bi bi-file-earmark-fill",
      subName: "bi bi-clock-fill",
    },

    {
      name: "bi bi-grid-fill",
    },

    {
      name: "bi bi-list-task",
    },

    {
      name: "bi bi-clipboard-check-fill",
    },

    {
      name: "bi bi-camera-fill",
    },

    {
      name: "bi bi-search",
    },
  ];
  return (
    <>
      <div id="sideNavPdf">
        {icons.map((icon, index) => (
          <div className="iconSideNavPdf" key={index}>
            <i className={`${icon.name}`}></i>
          </div>
        ))}
      </div>
    </>
  );
}
