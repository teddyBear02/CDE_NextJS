"use client";
import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

interface Props {
  eventClose: any;
  token: any;
}

let ModalUpload = ({ eventClose, token }: Props) => {
  const [files, setFiles] = useState<undefined | File | any>();
  const [preview, setPrivew] = useState<string | ArrayBuffer | null>(null);

  // const onDrop = useCallback((acceptedFiles: FileList) => {
  //   const file = new FileReader();
  //   file.onload = function () {
  //     setPrivew(file.result);
  //   };

  //   file.readAsDataURL(acceptedFiles[0]);
  // }, []);
  // const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
  //   useDropzone({ onDrop });

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFiles(target.files[0]);
  }
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (typeof files[0] === "undefined") return;

    const formData = new FormData();

    formData.append("fileName", files[0].name);

    const result = await fetch("api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    console.log(files, result);
  }
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
