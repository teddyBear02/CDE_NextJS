export default function ListItem({
  params,
}: {
  params: { tag: string; project: any; eventClick: any };
}) {
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
            <th scope="col">{params.tag}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {params.project.map((project: any) => (
            <tr
              className="hoverList"
              key={project.id}
              onClick={params.eventClick}
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
}
