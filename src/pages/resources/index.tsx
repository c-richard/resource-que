import React from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { Layout } from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { ResourceSummary } from "../../components/ResourceSummary";
import { AuthGuard } from "../../components/AuthGuard";
import { Heading } from "../../components/Heading";
import { Link } from "../../components/Link";

const Resources: NextPage = () => {
  const { data: sessionData } = useSession();

  const userId = sessionData?.user?.id;
  const { data: resources } = trpc.resource.getByUserId.useQuery(userId || "", {
    enabled: userId !== undefined,
  });

  return (
    <AuthGuard>
      <Layout title="Resources">
        <Heading>Resources</Heading>
        {resources && resources.length > 0 && (
          <ul className="mt- mb-8 flex flex-wrap gap-8">
            {resources.map((r) => (
              <li className="w-full" key={r.id}>
                <ResourceSummary {...r} />
              </li>
            ))}
          </ul>
        )}
        <Link href="/resources/create" variant="primary">
          Create +
        </Link>
      </Layout>
    </AuthGuard>
  );
};

export default Resources;
