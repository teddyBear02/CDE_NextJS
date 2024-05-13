"use client";
import projectService from "@/service/home/projectService";
import { createContext, useEffect, useState } from "react";
import { env } from "@/config/varenv";

type Props = {
  children: any;
};

export const HomeProvider = createContext<any>({});

export const HomeContext = ({ children }: Props) => {
  const token: string | any = env.BASE_URL;

  const [listProject, setListProject] = useState<any>();

  const dataProject = async () => {
    const response = await projectService.getProject(token);
    setListProject(response);
    localStorage.setItem("invite", "0");
  };

  useEffect(() => {
    dataProject();
  }, []);

  return (
    <HomeProvider.Provider value={{ listProject }}>
      {children}
    </HomeProvider.Provider>
  );
};
