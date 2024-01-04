"use client";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "../components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import projectService from "@/service/projectService";

interface Project {
  ProjectName: string;
  StartDate: Date;
  FinishDate: Date;
}
export default function Home() {
  let token = localStorage.getItem("userData");

  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]); // Chứa danh sách các dự án

  const [project, setProject] = useState({}); //   Chứa dữ liệu của dự án:

  const router = useRouter();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const propsNone = {
    title: "Hiện tại chưa có dự án nào",
    subTitle: "Ấn nút tạo mới để tạo dự án",
  };

  //..................GET Project....................//
  async function getProject() {
    const data: any = await projectService.getProject(token);
    // setProjects(() => [...data]);
    console.log(data);
  }

  useEffect(() => {
    getProject();
  }, []);

  //.................................................//

  //.................POST Project....................//

  async function handleCreateProject() {
    try {
      const data = await projectService.handleCreateProject(project, token);
      if (data) {
        setProjects((prev: any) => [...prev, data]);
        setShowModal(!showModal);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  //.................................................//

  const toProject = (e: React.MouseEvent<HTMLElement>) => {
    let projectId = e.currentTarget.id;
    localStorage.setItem("projectId", projectId);
    router.push(`/project/:${projectId}`);
  };

  return (
    <>
      <div className="main">
        <NavBar />
        <div className="toRender container">
          <SubNav titleNav="Dự án" btnTitle="Tạo mới" event={toggleModal} />
          {projects.length === 0 ? (
            <None params={propsNone} />
          ) : (
            <ListProject project={projects} eventClick={toProject} />
          )}
        </div>
      </div>
      {showModal && (
        <ModalCreate
          showModal={showModal}
          handleClose={toggleModal}
          handleInputChange={handleInputChange}
          handleCreateProject={handleCreateProject}
        />
      )}
    </>
  );
}
