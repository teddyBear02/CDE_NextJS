interface Props {
  folders: any;
  titleName: string;
  user: string;
  timeCreate: string;
  size: string;
  statusTodo: string;
  eventClick: any;
}

export default function ListFolder({
  titleName,
  folders,
  user,
  timeCreate,
  statusTodo,
  size,
  eventClick,
}: Props) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">{titleName}</th>
            <th scope="col">{user}</th>
            <th scope="col">{timeCreate}</th>
            <th scope="col">{size}</th>
            <th scope="col">{}</th>
            <th scope="col">{statusTodo}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {folders.map((folder: any, index: any) => (
            <tr
              className="hoverList"
              key={index}
              id={folder.id}
              onClick={eventClick}
            >
              <th scope="row" className="icon">
                {folder.versions >= 1 ? (
                  <i className="bi bi-file-earmark-fill"></i>
                ) : (
                  <i className="bi bi-folder-fill"></i>
                )}
              </th>
              <td className="nameFol">{folder.name}</td>
              <td>{folder.user.name}</td>
              <td>{folder.created_at.slice(0, 10)}</td>
              <td>{folder.updated_at.slice(0, 10)}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
