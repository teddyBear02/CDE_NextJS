"use client";
import { useEffect, useState } from "react";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "../components";
import { env } from "@/config/varenv";
import projectService from "@/service/home/projectService";

const Home = () => {
  let token: any = env.TOKEN;

  const paramNone = {
    title: "Hiện không có dự án nào",
    subTitle: "Ấn tạo mới để tạo dự án ",
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [data, setData] = useState<any[]>([]);

  //..................GET Project....................//

  const dataProject = async () => {
    const respone = await projectService.getProject(token);
    setData(respone);
  };

  useEffect(() => {
    dataProject();
  }, []);

  //.................................................//

  //.................POST Project....................//

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    finish_date: "",
  });

  const handleSubmit = async () => {
    const response = await projectService.handleCreateProject(formData, token);
    setData((prev: any) => [...prev, response]);
    toggleModal();
  };

  //.................................................//

  return (
    <>
      <div className="main">
        <NavBar />
        <div className="toRender container">
          <SubNav titleNav="Dự án" btnTitle="Tạo mới" event={toggleModal} />
          {data === undefined || data.length === 0 ? (
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
          handleInputChangeName={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          handleInputChangeStart={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
          handleInputChangeEnd={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, finish_date: e.target.value })
          }
          handleCreateProject={handleSubmit}
        />
      )}
    </>
  );
};

export default Home;
