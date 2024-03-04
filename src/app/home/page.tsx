"use client";
import { useState } from "react";
import { NavBar, SubNav, None, ModalCreate, ListProject } from "../components";
import { env } from "@/config/varenv";
import { useQuery, useMutation } from "react-query";

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

  const query = useQuery("project", async () => {
    const response = await fetch(`${env.BASE_URL}/api/project`);
    return response.json();
  });

  const { data, isLoading, error } = query;

  //.................................................//

  //.................POST Project....................//

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    finish_date: "",
  });

  const mutateData = async (data: any) => {
    const response = await fetch(`${env.BASE_URL}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const mutation = useMutation(mutateData, {
    onSuccess: (data) => {
      console.log("Data posted successfully:", data);
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

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
          handleCreateProject={mutation.mutate(formData)}
        />
      )}
    </>
  );
};

export default Home;
