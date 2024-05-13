import Link from "next/link";

export default function Nav() {
  return (
    <>
      <nav id="myNav" className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href={"/home"}>
            CDE - Quản lý dự án
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success">Search</button>
          </form>
          <div
            className="d-flex flex-row-reverse showPanel"
            // onClick={handleShow}
          >
            <i className="bi bi-person" id="userIcon"></i>
            {/* {showPanel && (
              <div id="dropdown-info">
                <div className="userInfo">
                  <div className="thumbnailSection thumbnailDetails">
                    <div className="avatar">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="mt-1 full-width text-center">
                      <h3 className="textEllipsis">Nguyen Van A</h3>
                      <p className="small">nva@gmail.com</p>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={toProfile}>
                    Hồ sơ cá nhân
                  </button>
                </div>
                <hr />
                <ul className="listDown">
                  <li onClick={toLogin}>Đăng xuất</li>
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </nav>
    </>
  );
}
