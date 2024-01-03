interface Props {
  titleNav: string;
  disable?: boolean;
  btnTitle?: string;
  event?: any;
}
export default function SubNav({ titleNav, disable, event, btnTitle }: Props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="subNav">
        <div className="container-fluid ">
          <span className="navbar-brand">{titleNav}</span>
          <span className={`navbar-text ${disable ? "disable" : ""}`}>
            <button className="btn btn-primary" onClick={event}>
              {btnTitle}
            </button>
          </span>
        </div>
      </nav>
    </>
  );
}
