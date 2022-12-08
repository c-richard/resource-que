import { Resource } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export const ResourceSummary = (resource: Resource) => {
  const router = useRouter();

  return (
    <div className="border-2 border-solid border-black">
      <h2>{resource.name}</h2>
      <p>{resource.description}</p>
      <Link href={`/resources/${resource.id}`}>View</Link>
    </div>
  );
};
