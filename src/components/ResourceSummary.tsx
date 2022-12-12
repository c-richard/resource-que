import { Resource } from "@prisma/client";
import { useRouter } from "next/router";
import { Link } from "../components/Link";

export const ResourceSummary = (resource: Resource) => {
  const router = useRouter();

  return (
    <Link variant="card" href={`/resources/${resource.id}`}>
      <h2 className="text-lg uppercase text-slate-500">{resource.name}</h2>
      {/* <p>{resource.description}</p> */}
      {/* <Link href={`/resources/${resource.id}`}>View</Link> */}
    </Link>
  );
};
