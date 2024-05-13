import { useProjectContext } from "@/app/project/layout";
import { useRouter } from "next/navigation";

export default function navPdf() {
  const { setViewPdf, viewPdf } = useProjectContext();
  const routerNav = useRouter();
  const project_id = localStorage.getItem("project_id");
  return (
    <>
      <div className="wrapperNavPdf">
        <div className="backFromPdf">
          <div
            onClick={() => {
              setViewPdf(false);
              routerNav.push(`/project/${project_id}/data`);
            }}
            className="goBackBox"
          >
            <i className="bi bi-arrow-left"></i>
            {"Back"}
          </div>
        </div>

        <div className="designer">
          <i className="bi bi-pencil-fill"></i>
          <i className="bi bi-alphabet-uppercase"></i>
          <i className="bi bi-palette-fill"></i>
        </div>

        <div className="tools">
          <i className="bi bi-clipboard-check-fill"></i>
          <i className="bi bi-printer-fill"></i>
          <i className="bi bi-download"></i>
        </div>

        <div className="fullScreen">
          <i className="bi bi-fullscreen"></i>
        </div>
      </div>
    </>
  );
}
