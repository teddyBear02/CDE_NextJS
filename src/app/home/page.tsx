"use client";
import { useEffect, useState } from "react";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "../components";
import projectService from "@/service/projectService";

const Home = () => {
  const paramNone = {
    title: "Hiện không có dự án nào",
    subTitle: "Ấn tạo mới để tạo dự án ",
  };

  const [data, setData] = useState();

  const [project, setProject] = useState({}); //   Chứa dữ liệu của dự án:

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  let token: any;
  //..................GET Project....................//

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      token = localStorage.getItem("Token");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await projectService.getProject(token);
        setData(responseData);
      } catch (error) {
        console.error("Không lấy được dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  console.log(token);

  //.................................................//

  //.................POST Project....................//

  const createProject = async () => {
    try {
      const res = await projectService.handleCreateProject(project, token);
      setData(res);
    } catch (error) {
      console.error("Lỗi khi POST dự án !!!");
    }
  };

  //.................................................//

  return (
    <>
      <div className="main">
        <NavBar />
        <div className="toRender container">
          <SubNav titleNav="Dự án" btnTitle="Tạo mới" event={toggleModal} />
          {data === undefined ? (
            <None params={paramNone} />
          ) : (
            <ListProject projects={data} />
          )}
        </div>
      </div>
      {showModal && (
        <ModalCreate
          showModal={showModal}
          handleClose={toggleModal}
          handleInputChange={handleInputChange}
          handleCreateProject={createProject}
        />
      )}
    </>
  );
};

export default Home;
