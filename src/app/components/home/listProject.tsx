"use client";
import { useRouter } from "next/navigation";
// import projectService from "@/service/projectService";
// import { useEffect } from "react";
interface Props {
  projects: any;
  tag?: any;
}

let ListItem = ({ projects, tag }: Props) => {
  const router = useRouter();

  const token = localStorage.getItem("Token");
  // const getProject = async () => {
  //   const data: any = await projectService.getProject(token);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getProject();
  // }, []);

  const toProject = (e: React.MouseEvent<HTMLElement>) => {
    let projectId = e.currentTarget.id;
    localStorage.setItem("projectId", projectId);
    router.push(`/project/:${projectId}`);
  };

  return (
    <>
      <table className="table table-hove">
        <thead className="height-3rem">
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Last visited</th>
            <th scope="col">Modifile on</th>
            <th scope="col">{tag}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
          {projects.map((project: any, index: any) => (
            <tr
              className="hoverList height-3rem"
              key={index}
              onClick={toProject}
              id={project.id}
            >
              <th scope="row">{project.id}</th>
              <td>{project.ProjectName}</td>
              <td>0 Kb</td>
              <td>mm/dd/yyyy</td>
              <td>mm/dd/yyyy</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListItem;
