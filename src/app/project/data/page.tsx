// import Folders from "@/test/testData";
import { SubNav, ListFolder, NoneFolder } from "@/app/components";

let Folder = async () => {
  let dataFolder: any;

  return (
    <>
      <div className="container showFolder">
        <SubNav titleNav="Thư mục" btnTitle="Tạo mới" />
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
    </>
  );
};

export default Folder;
