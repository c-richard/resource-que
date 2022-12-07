import { Resource } from "@prisma/client";
import { useRouter } from "next/router";
import { Button } from "./Button";

export const ResourceSummary = (resource: Resource) => {
  const router = useRouter();

  return (
    <div className="border-2 border-solid border-black">
      <h2>{resource.name}</h2>
      <p>{resource.description}</p>
      <Button onClick={() => router.push(`/resource/${resource.id}`)}>
        View
      </Button>
    </div>
  );
};
