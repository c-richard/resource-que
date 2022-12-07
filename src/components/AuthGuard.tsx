import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status == "authenticated") {
    return children;
  }

  return <p>Loading...</p>;
};
