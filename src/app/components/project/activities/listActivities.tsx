interface Props {
  data: any;
}

const ListActivities = ({ data }: Props) => {
  return (
    <>
      {data.map((item: any, index: any) => (
        <div className="activities-item">
          <div className="activity-time">
            <p>{item.updated_at.slice(0, 10)}</p>
          </div>
          <div className="flex-row">
            <div className="activity-type">
              <i className="bi bi-folder-fill"></i>
            </div>
            <div className="activity">
              <div className=""></div>
              <div className="row-center">
                <div className="avatar mr-2 ml-3"></div>
                <div className="text-ellipsis">
                  <h5 className="">{item.user.name}</h5>
                  <small>--</small>
                </div>
              </div>
              <div className="mt-1">
                <p>{item.content}</p>
              </div>
            </div>
            <div className="vertical-center"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListActivities;
