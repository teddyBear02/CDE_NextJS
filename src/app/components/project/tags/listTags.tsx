interface Props {
  tags: any;
  toggleModal?: any;
  toggleModalDelete?: any;
  classDisable?: any;
  disableBtn?: any;
}

let ListTags = ({
  tags,
  toggleModalDelete,
  toggleModal,
  classDisable,
  disableBtn,
}: Props) => {
  return (
    <>
      <ul className="listTags">
        {tags.map((tag: any, index: any) => (
          <li className="row" key={index} id={`${tag.id}`}>
            <div className="nameTag col">{tag.name}</div>
            <div className="col-xl-2 actionTags">
              <button
                onClick={toggleModal}
                className={`${classDisable}`}
                disabled={disableBtn}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                onClick={toggleModalDelete}
                className={`${classDisable}`}
                disabled={disableBtn}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTags;
