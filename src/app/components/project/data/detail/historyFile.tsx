interface Props {
  handleBack: any;
  handleHideOption: any;
  data: any;
}

const HistoryFile = ({ handleBack, handleHideOption, data }: Props) => {
  return (
    <>
      <div id="history">
        <div className="panel">
          <header className="header">
            <button className="btn" onClick={handleBack}>
              <i className="bi bi-arrow-left"></i>
            </button>

            <h3>Version history</h3>

            <button className="btn exit" onClick={handleHideOption}>
              <i className="bi bi-x-lg"></i>
            </button>
          </header>
          <section className="mb-0">
            <div className="panel-body">
              <div className="sub-section">
                <ul className="list version-history">
                  {data.map((file: any, index: any) => (
                    <li className="list-item group border-bottom" key={index}>
                      <div className="group-items">
                        <div>
                          <div className="revision-wrapthumb">
                            <i className="bi bi-file-earmark-fill"></i>
                          </div>
                        </div>
                        <div className="block">
                          <div className="text-ellipsis">
                            <span className="text-semibold">
                              V.{file.versions}
                            </span>
                            <span className="text-meta mx-1">•</span>
                            <a
                              className="link-secondary"
                              target="_blank"
                              href="/projects/VijtgXJMdZ4/data/folder/AHk0vgocSNM"
                            >
                              {file.name}
                            </a>
                          </div>
                          <div className="text-ellipsis">
                            <small className="text-meta">
                              Nguyễn Thị Yến Nhi 0136 gmail.com
                            </small>
                          </div>
                          <div className="text-ellipsis">
                            <small className="text-meta">
                              Mar 30, 2024 09:28 AM
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HistoryFile;
