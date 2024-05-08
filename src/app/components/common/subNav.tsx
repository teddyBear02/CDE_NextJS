interface Props {
  titleNav: string;
  disable?: boolean;
  btnTitle?: string;
  event?: any;
  elemNav?: any;
  toFolder?: any;
  showBtn?: any;
  btnShow3D?: any;
  to3DModal?: any;
}
export default function SubNav({
  titleNav,
  disable,
  event,
  btnTitle,
  elemNav,
  toFolder,
  showBtn,
  btnShow3D,
  to3DModal,
}: Props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="subNav">
        <div className="container-fluid ">
          <div className="row">
            {elemNav ? (
              elemNav.map((item: any, index: any) => (
                <div className="navbar-brand col " key={index}>
                  <span
                    className={`hoverItemNav ${index}`}
                    id={`${item.id}`}
                    onClick={toFolder}
                  >
                    {elemNav.length >= 1 && elemNav[elemNav.length - 1] === item
                      ? `${item.name} `
                      : `${item.name} >`}
                  </span>
                </div>
              ))
            ) : (
              <span className="navbar-brand col-3">{titleNav}</span>
            )}
          </div>

          <span className={`navbar-text ${disable ? "disable" : ""}`}>
            {showBtn ? (
              <button className="btn btn-primary mx-4" onClick={to3DModal}>
                {btnShow3D}
              </button>
            ) : (
              <></>
            )}

            <button className="btn btn-primary ml-3" onClick={event}>
              {btnTitle}
            </button>
          </span>
        </div>
      </nav>
    </>
  );
}
