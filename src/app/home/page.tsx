"use client";
import { useState } from "react";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "../components";
import { env } from "@/config/varenv";
import { useQuery} from "react-query";
import projectService from "@/service/projectService";

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

  //..................GET Project....................//


  const { data, isLoading, error } = useQuery("project",() => {
    fetch(`${env.BASE_URL}/api/project`)
      .then((res) => res.json())
      .then((res) => res = data)
      .catch(()=> console.log("Lỗi"))
  });

  if(error){
    console.log("Error")
  }

  //.................................................//

  //.................POST Project....................//

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    finish_date: "",
  });

  const handleSubmit  = async (data: any) => {
    const response = await projectService.getProject(data)
    return response.json();
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
