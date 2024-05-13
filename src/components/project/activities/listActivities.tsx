interface Props {
  data: any;
}

const ListActivities = ({ data }: Props) => {
  const formatTime = (timestamp: string) => {
    const input_time = new Date(timestamp);
    const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayOfWeek = weekdays[input_time.getDay()];
    const formatted_hours = input_time.getHours().toString().padStart(2, '0');
    const formatted_minutes = input_time.getMinutes().toString().padStart(2, '0');
    const formatted_seconds = input_time.getSeconds().toString().padStart(2, '0');
    return `${dayOfWeek}, ngày ${input_time.getDate()} tháng ${input_time.getMonth() + 1}, ${formatted_hours}:${formatted_minutes}:${formatted_seconds}`;
  };
  return (
    <>
      {data.map((item: any, index: any) => (
        <div className="activities-item">
          <div className="activity-time">
            <p>{formatTime(item.updated_at)}</p>
          </div>
          <div className="flex-row">
            <div className="activity-type">
              <i className="bi bi-folder-fill"></i>
            </div>
            <div className="activity">
              <div className=""></div>
              <div className="row-center">
                <div className="avatar mr-2 ml-3">
                  <img src={item.user.avatar} alt="" />
                </div>
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
