"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { NavPdf, SideNavPdf } from "@/app/components";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

export default function ViewPdf() {
  const [numPages, setNumPages] = useState<number>();
  ``;
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
              file={"/nhom1.pdf"}
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
