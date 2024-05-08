import { createContext, Dispatch, SetStateAction } from "react";

interface ProjectContextType {
  setViewPdf: (value: boolean) => void | Dispatch<SetStateAction<boolean>>;
  viewPdf?: boolean;
}

const defaultValue: ProjectContextType = {
  setViewPdf: () => {},
};

export const ProjectContext = createContext(defaultValue);
