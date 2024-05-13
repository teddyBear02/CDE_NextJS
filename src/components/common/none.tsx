export default function None({
  params,
}: {
  params: {
    title: string;
    subTitle: string;
  };
}) {
  return (
    <>
      <div id="project">
        <div id="descrip">
          <br />
          <h3>{params.title}</h3>
          <br />
          <p>{params.subTitle}</p>
        </div>
      </div>
    </>
  );
}
