"use client";
import { NavBar, SideBar } from "@/app/components";
import ViewPdf from "./view/page";
import { useEffect } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let projectId: any;
  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      projectId = localStorage.getItem("projectId");
    }
  }, []);

  let isViewPdf = false;

  if (isViewPdf) {
    return (
      <>
        <div className="grid-container-CDE">
          <div>
            <NavBar />
          </div>
          <div>
            <ViewPdf />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div id="wrapperProject">
          <SideBar projectId={projectId} />
          {children}
        </div>
      </>
    );
  }
}
