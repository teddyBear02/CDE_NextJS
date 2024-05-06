import Link from "next/link";
interface Props {
  projects: any;
  tag?: any;
}

let ListItem = ({ projects, tag }: Props) => {
  const getProjectId = (e: React.MouseEvent<HTMLElement>) => {
    let project_id = e.currentTarget.id;
    localStorage.setItem("project_id", project_id);
  };

  return (
    <>
      <div className="table-list-project">
        <div className="row sm-height" id="header">
          <div className="col-3 col-sm-1 col-md-1 col-lg-1 cl-bl"></div>
          <div className="col col-sm-4 col-md-5 col-lg-3 cl-bl">Tên dự án</div>
          <div className="col-sm-3 col-md-2 col-lg-2 cl-bl"></div>
          <div className="col-lg-2 cl-bl">Lần cuối vào dự án</div>
          <div className="col-sm-3 col-md-3 col-lg-3 cl-bl">
            Thời gian chỉnh sửa
          </div>
          <div className="col-2 col-sm-1 col-md-1 col-lg-1  cl-bl"></div>
        </div>
        {projects?.map((project: any, index: any) => (
          <Link
            href={`/project/${project.id}`}
            key={index}
            id={project.id}
            onClick={getProjectId}
          >
            <div className="row sm-height hoverList bodyList ">
              <div className="col-3 col-sm-1 col-md-1 col-lg-1 cl-bl"></div>
              <div className="col col-sm-4 col-md-5 col-lg-3 cl-bl">
                {project.name}
              </div>
              <div className="col-sm-3 col-md-2 col-lg-2 cl-bl"></div>
              <div className="col-lg-2 cl-bl">
                {project.updated_at.slice(0, 10)}
              </div>
              <div className="col-sm-3 col-md-3 col-lg-3 cl-bl">
                {project.created_at.slice(0, 10)}
              </div>
              <div className="col-2 col-sm-1 col-md-1 col-lg-1  cl-bl"></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListItem;
