import EditTodo from "./editTodo";
import InfoTodo from "./infoTodo";

interface Props {
  handleToogleEdit?: any;
  handleHideOption: any;
  isActive?: any;
  onChangeComment: any;
  cancelCmt: any;
  createCmt: any;
  showCmt: any;
  isEdit: any;
  handleBack: any;
  saveBtn: any;
}

const DetailTodo = ({
  handleHideOption,
  handleToogleEdit,
  isActive,
  onChangeComment,
  cancelCmt,
  createCmt,
  showCmt,
  isEdit,
  handleBack,
  saveBtn,
}: Props) => {
  return (
    <>
      <div className="right">
        {isEdit ? (
          <EditTodo
            handleBack={handleBack}
            handleHideOption={handleHideOption}
            saveBtn={saveBtn}
          />
        ) : (
          <InfoTodo
            handleHideOption={handleHideOption}
            handleToogleEdit={handleToogleEdit}
            isActive={isActive}
            onChangeComment={onChangeComment}
            cancelCmt={cancelCmt}
            createCmt={createCmt}
            showCmt={showCmt}
          />
        )}
      </div>
    </>
  );
};

export default DetailTodo;
