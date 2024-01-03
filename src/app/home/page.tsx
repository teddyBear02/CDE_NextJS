import { NavBar, SubNav, None } from "../components";

export const metadata = {
  title: "Home Page",
};

export default function Home() {
  const propsSubNav = {
    titleNav: "Dự án",
    disabel: false,
    btnTitle: "Tạo mới",
  };

  const propsNone = {
    title: "Hiện tại chưa có dự án nào",
    subTitle: "Ấn nút tạo mới để tạo dự án",
  };

  return (
    <>
      <NavBar />
      <div className="toRender container">
        <SubNav params={propsSubNav} />
        {<None params={propsNone} />}
      </div>
    </>
  );
}
