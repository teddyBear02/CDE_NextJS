import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  closeModal: any;
  handleInputName: any;
  handleInputStart: any;
  handleInputEnd: any;
  createTodo: any;
  isCallingApi: boolean
}

function ModalNewTodo({
  closeModal,
  handleInputName,
  handleInputStart,
  handleInputEnd,
  createTodo,
  isCallingApi
}: Props) {
  return (
    <>
      <div className="modalCreateFolder">
        <div className="boxModal" id="modalTodo">
          <div className="header">
            <h3>Tạo việc cần làm</h3>
            <button onClick={closeModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div id="content" className="middleContent">
            <form id="detail">
              <label>Tên việc cần làm:</label>

              <input
                type="text"
                placeholder="Việc cần làm"
                name="name"
                onChange={handleInputName}
              />

              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                onChange={handleInputStart}
                name="start_date"
              />

              <label>Ngày kết thúc:</label>
              <input type="date" onChange={handleInputEnd} name="finish_date" />
            </form>
          </div>

          <div id="footer">
            <hr />
            <div className="wrap-btn">
              <button className="cancel" onClick={closeModal}>
                Hủy
              </button>
              <Button className="create" disabled={isCallingApi} type="submit" onClick={createTodo}>
                Tạo mới
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalNewTodo;
