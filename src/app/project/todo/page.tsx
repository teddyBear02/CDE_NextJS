import { TodoComponent } from "@/app/components";
export default function Todo() {
  let data: undefined;
  return (
    <>
      <TodoComponent data={data} />
    </>
  );
}
