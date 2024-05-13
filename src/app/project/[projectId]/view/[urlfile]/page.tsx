"use client";
import { NavBar, NavPdf, SideNavPdf } from "@/components";

import { useParams } from "next/navigation";

export default function ViewPdf() {
  const params = useParams<{ urlfile: string }>();
  return (
    <>
      <NavBar />
      <div id="wrapperPdf">
        <div id="navPdf">
          <NavPdf />
        </div>

        <div className="mainPdf">
          <SideNavPdf />
          <div id="viewPdf" style={{ width: "90vw", height: "90vh" }}>
            <iframe
              style={{ width: "80%", height: "100%" }}
              src={`http://127.0.0.1:8000/Files/${params.urlfile}`}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
