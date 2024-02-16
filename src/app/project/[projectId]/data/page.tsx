"use client";
import {
  SubNav,
  ListFolder,
  NoneFolder,
  ModalNewFolder,
  ModalCreateFolder,
} from "@/app/components";
import { useState } from "react";
let Folder = () => {
  let dataFolder: any;

  const [newOpen, setNewOpen] = useState(false);
  const [isOpenCreateFolder, setIsOpenCreateFolder] = useState(false);

  const handleNewOpen = () => {
    setNewOpen(!newOpen);
  };

  return (
    <>
      <div className="container showFolder">
        <div>
          <SubNav titleNav="Thư mục" btnTitle="Tạo mới" event={handleNewOpen} />
          {newOpen && <ModalNewFolder />}
        </div>

        {dataFolder !== undefined ? (
          <div className="container showFolder">
            <ListFolder
              titleName="Tên"
              user="Người sửa đổi"
              timeCreate="Sửa đổi"
              size="Kích thước"
              statusTodo="Tags"
              data={dataFolder}
            />
          </div>
        ) : (
          <NoneFolder />
        )}
      </div>

      {<ModalCreateFolder />}
    </>
  );
};

export default Folder;
