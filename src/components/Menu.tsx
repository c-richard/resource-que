import { signOut, useSession } from "next-auth/react";
import { Button } from "./Button";

interface MenuProps {
  name: string;
  image: string;
}

export const Menu = ({ name, image }: MenuProps) => {
  const { data: sessionData } = useSession();
  return (
    <div>
      <p>{`Welcome, ${name}`}</p>
      <img src={image} alt="Avatar" />
      {sessionData && <Button onClick={() => signOut()}>Sign out</Button>}
    </div>
  );
};
