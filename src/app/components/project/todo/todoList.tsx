import React from 'react';

interface Props {
  data: any;
  title: string;
  user: string;
  timeCreate: string;
  timeModified: string;
  status: string;
  state: string;
  handleClick: any;
}


export default function TodoList({
  title,
  data,
  user,
  timeCreate,
  status,
  timeModified,
  state,
  handleClick,
}: Props) {
 
  return (
    <>
   <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">{title}</th>
      <th scope="col">{user}</th>
      <th scope="col">{timeCreate}</th>
      <th scope="col">{timeModified}</th>
      <th scope="col">{state}</th>
      <th scope="col">{status}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colSpan={6}> 
        <div className="table-wrapper scrollable"  style={{ overflowY: 'scroll', height: '400px' }}>
          <table  style={{ width: '100%' }}>
            <tbody className="table-group-divider">
              {data.map((data: any) => (
                <tr
                  className="hoverList todoList"
                  key={data.id}
                  id={data.id}
                  onClick={handleClick(id)}
                >
               {/*   <td className="icon">
                  <i className="bi bi-clipboard-check-fill"></i>
              </td>   */} 
                  <td>{data.title}</td>
                  <td>{data.name}</td>
                  <td>{data.timeCreate}</td>
                  <td>{data.timeModified}</td>
                  <td>{data.state}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>

    </>
  );
}
