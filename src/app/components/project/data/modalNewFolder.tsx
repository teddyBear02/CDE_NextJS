"use client";

import React from "react";
interface Props {
  closeModal: any;
  createFolder: any;
}

let ModalNewFolder = ({ closeModal, createFolder }: Props) => {
  let nameProject = "My futuer house";

  return (
    <>
      <div className="modalCreateFolder">
        <div className="boxModal" id="boxCreateFolder">
          <div className="header">
            <h3>Tạo thư mục trong '{nameProject}'</h3>
            <button onClick={closeModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <form onSubmit={createFolder} method="POST">
            <div id="content" className="middleContent">
              <p>Hãy điền tên cho thư mục</p>
              <label htmlFor="">Tên</label>
              <div className="input">
                <input type="text" name="" id="" />
              </div>
              <div className="line"></div>
            </div>

            <div id="footer">
              <hr />
              <div className="wrap-btn">
                <button className="cancel" onClick={closeModal}>
                  Hủy
                </button>
                <button className="create" type="submit">
                  Tạo mới
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalNewFolder;
