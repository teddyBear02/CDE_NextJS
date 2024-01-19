import type { Metadata } from "next";
import GlobalStyle from "./styles/globalStyle";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Providers from "./until/Providers";
import { pdfjs } from "react-pdf";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <GlobalStyle>
        <html lang="en">
          <body>{children}</body>
        </html>
      </GlobalStyle>
    </Providers>
  );
}
