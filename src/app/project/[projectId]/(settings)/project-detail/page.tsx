"use client";
// import các thư viện hoặc các hooks...
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import các component hoặc các services
import { ProjectDetail } from "@/app/components";
import { env } from "@/config/varenv";
import { SubNav, ModalDeleteProject, ModalQuitProject } from "@/app/components";
import CheckRole from "@/service/project/checkRole";
import projectService from "@/service/home/projectService";

export default function projectDetail() {
  const [openDelete, setOpenDelete] = useState(false);

  const [openQuit, setOpenQuit] = useState<any>(false);

  const [projectInfo, setProjectInfo] = useState();

  let token = env.TOKEN;

  let project_id = localStorage.getItem("project_id");

  const router = useRouter();

  //......................Get info Project............................//

  const getInforProject = async () => {
    const res = await projectService.getProject(token, project_id);
    setProjectInfo(res);
    // console.log(projectInfo);
    console.log(projectInfo);
  };

  useEffect(() => {
    getInforProject();
  }, []);

  //...................... Quit project ..............................//

  const handleQuitProject = async () => {
    // await projectService.handleQuitProject(token, project_id);
    // router.push("/home");
  };

  //....................................................................//

  //...................... Delete project ..............................//

  const handleDeleteProject = async () => {
    await projectService.handleDeleteProject(token, project_id);
    router.push("/home");
  };

  //....................................................................//
  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Thông tin dự án" btnTitle="Lưu thay đổi" />
        <ProjectDetail
          data_project={projectInfo}
          delete_project={() => setOpenDelete(true)}
          out_project={() => setOpenQuit(true)}
        />
      </div>

      {openDelete && (
        <ModalDeleteProject
          handleDeleteProject={handleDeleteProject}
          handleClose={() => setOpenDelete(false)}
        />
      )}

      {openQuit && (
        <ModalQuitProject
          handleQuitProject={handleQuitProject}
          handleClose={() => setOpenQuit(false)}
        />
      )}
    </>
  );
}
