interface Props {
  deleteAll: any;
}

export default function TagsDeleteAll({ deleteAll }: Props) {
  return (
    <>
      <div className="dropdown-pane" id="deteleAllTags">
        <p onClick={deleteAll}>Xóa tất cả</p>
      </div>
    </>
  );
}
