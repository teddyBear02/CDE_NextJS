interface Props {
  project: any;
  eventClick?: any;
  tag?: any;
}

let ListItem = ({ project, eventClick, tag }: Props) => {
  return (
    <>
      {/* <div className="grid-container">
        <div className="col-3 col-sm-1 col-md-1 col-lg-1">h1</div>
        <div className="">2</div>
        <div className="">3</div>
        <div className="">4</div>
        <div className="">5</div>
        <div className="">6</div>
      </div> */}

      <table className="table table-hove">
        <thead className="height-3rem">
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Last visited</th>
            <th scope="col">Modifile on</th>
            <th scope="col">{tag}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
          {project.map((project: any, index: any) => (
            <tr
              className="hoverList height-3rem"
              key={index}
              onClick={eventClick}
              id={project.id}
            >
              <th scope="row">{project.id}</th>
              <td>{project.ProjectName}</td>
              <td>0 Kb</td>
              <td>mm/dd/yyyy</td>
              <td>mm/dd/yyyy</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListItem;
