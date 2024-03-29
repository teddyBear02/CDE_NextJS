interface Props {
  data: any;
  titleName: string;
  user: string;
  timeCreate: string;
  size: string;
  statusTodo: string;
  eventClick: any;
}

export default function ListFolder({
  titleName,
  data,
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
          {data.map((data: any, index: any) => (
            <tr
              className="hoverList"
              key={index}
              id={data.id}
              onClick={eventClick}
            >
              <th scope="row"></th>
              <td>{data.folderName}</td>
              <td>{data.modifiled}</td>
              <td>{data.dateModified}</td>
              <td>{data.size}</td>
              <td>{data.tag}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
