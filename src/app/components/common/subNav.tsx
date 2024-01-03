export default function SubNav({
  params,
}: {
  params: {
    titleNav: string;
    disabel?: any;
    btnTitle?: string;
    event?: any;
  };
}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="subNav">
        <div className="container-fluid ">
          <span className="navbar-brand">{params.titleNav}</span>
          <span className={`navbar-text ${params.disabel ? "disable" : ""}`}>
            <button className="btn btn-primary">{params.btnTitle}</button>
          </span>
        </div>
      </nav>
    </>
  );
}
