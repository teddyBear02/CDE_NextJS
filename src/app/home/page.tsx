"use client";
import { useEffect, useState, useRef, useContext } from "react";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "@/components";
import { env } from "@/config/varenv";
import projectService from "@/service/home/projectService";
import { HomeProvider, HomeContext } from "@/Context/HomeContext";

const Home = () => {
  let token: any = env.TOKEN;

  const { listProject } = useContext(HomeProvider);

  const paramNone = {
    title: "Hiện không có dự án nào",
    subTitle: "Ấn tạo mới để tạo dự án ",
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [data, setData] = useState<any>();

  //..................GET Project....................//

  const dataProject = async () => {
    const response = await projectService.getProject(token);
    setData(response);
    localStorage.setItem("invite", "0");
  };

  useEffect(() => {
    dataProject();
  }, []);

  //.................................................//

  //.................POST Project....................//

  const fileInputRef = useRef<any>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    finish_date: "",
    note: "",
    thumbnails: "",
  });

  const handleSubmit = async () => {
    const response = await projectService.handleCreateProject(formData, token);
    setData(() => [...data, response]);
    toggleModal();
  };

  //.................................................//

  return (
    <HomeContext>
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
          handleInputChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          handleInputChangeStart={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, start_date: e.target.value });
          }}
          handleInputChangeEnd={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, finish_date: e.target.value });
          }}
          handleChangeNote={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, note: e.target.value });
          }}
          handleChangeThumbnail={(
            e: React.ChangeEvent<HTMLInputElement> | any
          ) => {
            // console.log(e.target.files[0]);
            setFormData({ ...formData, thumbnails: e.target.files[0] });
          }}
          handleUpload={handleClick}
          inputImgRef={fileInputRef}
          handleCreateProject={handleSubmit}
        />
      )}
    </HomeContext>
  );
};

export default Home;
