"use client";
import { NavBar, SideBar } from "@/components";
import ViewPdf from "./[projectId]/view/[urlfile]/page";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface ProjectContextType {
  setViewPdf: (value: boolean) => void;
  viewPdf?: boolean;
}

const defaultValue: ProjectContextType = {
  setViewPdf: () => {},
};
const ProjectContext = createContext(defaultValue);

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
  default: any;
}) {
  let project_id: any = localStorage.getItem("project_id");

  const [viewPdf, setViewPdf] = useState(false);

  return (
    <ProjectContext.Provider value={{ setViewPdf, viewPdf }}>
      {viewPdf ? (
        <div className="grid-container-CDE">
          <NavBar />
          <ViewPdf />
        </div>
      ) : (
        <>
          <NavBar />
          <div id="wrapperProject">
            <SideBar projectId={project_id} />
            {children}
          </div>
        </>
      )}
    </ProjectContext.Provider>
  );
}
export const useProjectContext = () => useContext(ProjectContext);
