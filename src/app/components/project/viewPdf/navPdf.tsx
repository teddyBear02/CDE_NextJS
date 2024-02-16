export default function navPdf() {
  return (
    <>
      <div className="wrapperNavPdf">
        <div className="backFromPdf">
          <div className="goBackBox">
            <i className="bi bi-arrow-left"></i>
            {"Back"}
          </div>
        </div>

        <div className="designer">
          <i className="bi bi-pencil-fill"></i>
          <i className="bi bi-alphabet-uppercase"></i>
          <i className="bi bi-palette-fill"></i>
        </div>

        <div className="tools">
          <i className="bi bi-clipboard-check-fill"></i>
          <i className="bi bi-printer-fill"></i>
          <i className="bi bi-download"></i>
        </div>

        <div className="fullScreen">
          <i className="bi bi-fullscreen"></i>
        </div>
      </div>
    </>
  );
}
