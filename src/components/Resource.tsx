import { Resource as ResourceType } from "@prisma/client";

export const Resource = (resource: ResourceType) => {
  return (
    <div>
      <h2>{resource.name}</h2>
      <p>{resource.description}</p>
    </div>
  );
};
