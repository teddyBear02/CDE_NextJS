import { NavBar, SideBar } from "../components";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div id="wrapperProject">
        <SideBar />
        <div className="container showFolder">{children}</div>
      </div>
    </>
  );
}
