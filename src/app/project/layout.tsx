"use client";
import { NavBar, SideBar } from "@/app/components";
import ViewPdf from "./[projectId]/view/page";
import { useState } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
  default: any;
}) {
  let projectId: any = localStorage.getItem("project_id");

  const [viewPdf, setViewPdf] = useState(false);

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
