import { NoneTodo } from "../..";
interface Props {
  data: any;
  title: string;
  user: string;
  timeCreate: string;
  timeModified: string;
  status: string;
  state: string;
}
export default function todoList({
  title,
  data,
  user,
  timeCreate,
  status,
  timeModified,
  state,
}: Props) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">{title}</th>
            <th scope="col">{user}</th>
            <th scope="col">{timeCreate}</th>
            <th scope="col">{timeModified}</th>
            <th scope="col">{state}</th>
            <th scope="col">{status}</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((data: any) => (
            <tr className="hoverList" key={data.id} id={data.id}>
              <th scope="row"></th>
              <td>{data.name}</td>
              <td>{data.userModified}</td>
              <td>{data.modifiedTime}</td>
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
