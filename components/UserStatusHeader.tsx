import { auth } from "@/auth";
import React from "react";

type Props = {};

export const UserStatusHeader = async (props: Props) => {
  const session = await auth();
  if (!session?.user) return <div>Login</div>;
  // console.log('session', session)
  return (
    <div>{session.user.name}</div>
  );
};
