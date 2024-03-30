"use client";
import React, { useState } from "react";
interface Props {
  eventClose: any;
  handleOnChange: any;
  handleSubmit: any;
}

let ModalUpload = ({ eventClose, handleSubmit, handleOnChange }: Props) => {
  return (
    <>
      <div className="modalCreateFolder">
        <div className="boxModal" id="modalUpload">
          <div className="header">
            <h3>Tải files lên</h3>
            <button onClick={eventClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div id="contentUpload" className="middleContent">
            <p>Bạn có thể chọn nhiều hơn 1 file cùng một lúc</p>
            <div id="boxDrop">
              <i className="bi bi-file-earmark"></i>
              <p>Kéo và thả file vào đây</p>
            </div>
            <p>- hoặc -</p>

            <input type="file" onChange={handleOnChange} />
            <button onClick={handleSubmit}>Tải lên</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpload;
