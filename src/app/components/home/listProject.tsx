interface Props {
  project: any;
  eventClick?: any;
  tag?: any;
}

let ListItem = ({ project, eventClick, tag }: Props) => {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Last visited</th>
            <th scope="col">Modifile on</th>
            <th scope="col">{tag}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {project.map((project: any, index: any) => (
            <tr
              className="hoverList"
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
