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

  //..................GET Project....................//
  // const data: any = await projectService.getProject(token);
  // console.log("Data: ", data);

  useEffect(() => {
    const fetchData = async () => {
      const token = req.cookies.get("token");

      try {
        const responseData = await projectService.getProject(token);
        setData(responseData);
      } catch (error) {
        console.error("Không lấy được dữ liệu:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once

  //.................................................//

  //.................POST Project....................//

  //.................................................//

  return (
    <>
      <div className="main">
        <NavBar />
        <div className="toRender container">
          <SubNav titleNav="Dự án" btnTitle="Tạo mới" />
          {data === undefined ? (
            <None params={paramNone} />
          ) : (
            <ListProject projects={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
