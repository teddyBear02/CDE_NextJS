"use client";
import { useState } from "react";
import { Privacy } from "@/app/components";
import { ChangePermiss } from "@/service/project/changePermiss";
import { env } from "@/config/varenv";

export default function Permission() {
  let token = env.TOKEN;

  let project_id = localStorage.getItem("project_id");

  const [todoPermiss, setTodoPermiss] = useState<any>(0);

  const [invitePermiss, setInvitePermiss] = useState<any>(0);

  const [permission, setPermission] = useState({
    todo_permission: "",
    invite_permission: "",
  });

  const handleOnchangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currVal: any = (e.currentTarget.closest(".inp-todo") as HTMLElement)
      ?.id;
    setTodoPermiss(parseInt(currVal));
    setPermission({ ...permission, todo_permission: currVal });
  };

  const handleOnchangeInvite = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currVal: any = (e.currentTarget.closest(".inp-invite") as HTMLElement)
      ?.id;
    setInvitePermiss(parseInt(currVal));
    setPermission({ ...permission, invite_permission: currVal });
  };

  const handleOnSaveChange = () => {
    ChangePermiss(token, project_id, permission);
  };

  return (
    <>
      <Privacy
        inviteChoice={invitePermiss}
        todoChoice={todoPermiss}
        onSaveChange={handleOnSaveChange}
        onChangeInvite={handleOnchangeInvite}
        onChangeTodo={handleOnchangeTodo}
      />
    </>
  );
}
