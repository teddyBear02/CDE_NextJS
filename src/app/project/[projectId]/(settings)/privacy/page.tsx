"use client";
import { useState } from "react";
import { Privacy } from "@/components";
import { ChangePermiss } from "@/service/project/changePermiss";
import { env } from "@/config/varenv";

export default function Permission() {
  let token = env.TOKEN;

  let project_id = localStorage.getItem("project_id");

  const invite_perrmission = localStorage.getItem("invite_permiss");

  const todo_perrmission = localStorage.getItem("todo_permiss");

  const [todoPermiss, setTodoPermiss] = useState<any>(todo_perrmission);

  const [invitePermiss, setInvitePermiss] = useState<any>(invite_perrmission);

  const [permission, setPermission] = useState({
    todo_permission: 0,
    invite_permission: 0,
  });

  const handleOnchangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currVal: any = (e.currentTarget.closest(".inp-todo") as HTMLElement)
      ?.id;

    let invite_val: any = (
      e.currentTarget.closest(".inp-invite") as HTMLElement
    )?.id;

    setTodoPermiss(parseInt(currVal));
    // setInvitePermiss(parseInt(invite_val));

    setPermission({
      ...permission,
      todo_permission: currVal,
      invite_permission: invite_val,
    });
  };

  console.log(permission);

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
