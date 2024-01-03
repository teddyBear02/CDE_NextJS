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
        {children}
      </div>
    </>
  );
}
