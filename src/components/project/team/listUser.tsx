import React from "react";

interface Props {
  data?: any;
  handleClick?: any;
}

function ListUser({ data, handleClick }: Props) {
  return (
    <>
      <div className="stickyHeader">
        <div className="row table-list-item table-list-head">
          <div className="col-2 col-sm-2 col-md-2 col-lg-1 px-1 col-xl-1">
            <div className="sort-head no-sort">
              <span className="text-ellipsis"></span>
            </div>
          </div>
          <div className="col-9 col-sm-5 col-md-3 col-lg-2 col-xl-3 px-1 list-data">
            <div className="sort-head no-sort">
              <span className="text-ellipsis">Tên</span>
            </div>
          </div>
          <div className="col col-xl-2 d-none d-lg-block px-1 list-data">
            <div className="sort-head no-sort">
              <span className="text-ellipsis"></span>
            </div>
          </div>
          <div className="col col-xl-1 d-none d-lg-block px-1 list-data">
            <div className="sort-head no-sort">
              <span className="text-ellipsis">Vai trò</span>
            </div>
          </div>
          <div className="col col-md-2 col-xl-2 d-none d-md-block px-1 list-data">
            <div className="sort-head no-sort">
              <span className="text-ellipsis">Trạng thái</span>
            </div>
          </div>
          <div className="col-3 col-sm-5 col-lg-4 col-xl-3 d-none d-sm-block px-1 list-data">
            <div className="sort-head no-sort">
              <span className="text-ellipsis">Truy cập lần cuối</span>
            </div>
          </div>
        </div>
      </div>

      <div id="list">
        {data.map((data: any, index: any) => (
          <div
            className="row table-list-item table-list-head"
            key={index}
            onClick={handleClick}
            id={`${data.user_id}`}
          >
            <div className="col-2 col-sm-2 col-md-2 col-lg-1 px-1 col-xl-1">
              <div className="sort-head no-sort">
                <span className="text-ellipsis"></span>
              </div>
            </div>
            <div className="col-9 col-sm-5 col-md-3 col-lg-2 col-xl-3 px-1 list-data userName">
              <div className="sort-head no-sort">
                <span className="text-ellipsis userName">{data.user.name}</span>
              </div>
            </div>
            <div className="col col-xl-2 d-none d-lg-block px-1 list-data">
              <div className="sort-head no-sort">
                <span className="text-ellipsis"></span>
              </div>
            </div>
            <div className="col col-xl-1 d-none d-lg-block px-1 list-data">
              <div className="sort-head no-sort">
                <span className="text-ellipsis">{data.role}</span>
              </div>
            </div>
            <div className="col col-md-2 col-xl-2 d-none d-md-block px-1 list-data">
              <div className="sort-head no-sort">
                <span className="text-ellipsis">{data.status}</span>
              </div>
            </div>
            <div className="col-3 col-sm-5 col-lg-4 col-xl-3 d-none d-sm-block px-1 list-data">
              <div className="sort-head no-sort">
                <span className="text-ellipsis">Truy cập lần cuối</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListUser;
