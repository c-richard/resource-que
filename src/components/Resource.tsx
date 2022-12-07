import { Resource as ResourceType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "./Button";

export const Resource = (resource: ResourceType) => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div className="border-2 border-solid border-black">
      <h2>{resource.name}</h2>
      <p>{resource.description}</p>
      {resource.ownerId === data?.user?.id && (
        <Button
          onClick={() =>
            router.push(`${window.location.origin}/resource/${resource.id}`)
          }
        >
          Edit
        </Button>
      )}
    </div>
  );
};
