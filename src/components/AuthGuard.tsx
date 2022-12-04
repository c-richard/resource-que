import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData === undefined) signIn();
  }, [sessionData]);

  if (sessionData === undefined) {
    return <p>Loading...</p>;
  } else {
    return children;
  }
};
