import { signOut, useSession } from "next-auth/react";
import { Button } from "./Button";

interface MenuProps {
  name: string;
  image: string;
}

export const Menu = ({ name, image }: MenuProps) => {
  const { data: sessionData } = useSession();
  return (
    <div className="my-8 mb-16 flex items-center justify-end lg:mb-24">
      <div className="text-right leading-tight tracking-wide ">
        <h2 className="text-slate-600">{`Welcome, ${name}`}</h2>
        {sessionData && (
          <Button
            onClick={() => signOut()}
            className="text-sm text-slate-400 underline"
          >
            Sign out
          </Button>
        )}
      </div>
      <img
        src={image}
        alt="Avatar"
        className="saturate-25 ml-4 w-12 rounded-full brightness-100 brightness-125"
      />
    </div>
  );
};
