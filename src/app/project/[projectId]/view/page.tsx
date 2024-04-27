"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar, NavPdf, SideNavPdf } from "@/app/components";

interface Props {
  file?: any;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

export default function ViewPdf() {
  const [numPages, setNumPages] = useState<number>();

  // const [file, setFile] = useState<any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  let pagesPdf = Array.apply(null, Array(numPages))
    .map((x, i) => i + 1)
    .map((page) => {
      return (
        <Page
          key={page}
          pageNumber={page}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      );
    });

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://drive.google.com/file/d/1FrjAVdgQDy4vDNVhRUHHy72mBOuwYBJt/preview",
  //       { responseType: "blob" }
  //     )
  //     .then((response: any) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64Data: any = reader.result;
  //         const newFile = new File([base64Data], "filename.pdf", {
  //           type: "application/pdf",
  //         });
  //         setFile(newFile);
  //       };
  //       reader.readAsDataURL(response.data);
  //       console.log(response);
  //     });
  // }, []);

  return (
    <>
      <div id="wrapperPdf">
        <div id="navPdf">
          <NavPdf />
        </div>

        <div className="mainPdf">
          <SideNavPdf />

          <div id="viewPdf">
            <Document
              renderMode="canvas"
              imageResourcesPath="/stock.jpg"
              // file={{
              //   url: ``,
              // }}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {pagesPdf}
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}
