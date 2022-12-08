import React from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Layout } from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { ResourceSummary } from "../../components/ResourceSummary";
import { AuthGuard } from "../../components/AuthGuard";

const Resources: NextPage = () => {
  const { data: sessionData } = useSession();

  const userId = sessionData?.user?.id;
  const { data: resources } = trpc.resource.getByUserId.useQuery(userId || "", {
    enabled: userId !== undefined,
  });

  return (
    <AuthGuard>
      <Layout title="Resources">
        <h1>Resources</h1>
        {resources && resources.length > 0 && (
          <ul>
            {resources.map((r) => (
              <ResourceSummary key={r.id} {...r} />
            ))}
          </ul>
        )}
        <Link href="/resources/create">Create +</Link>
      </Layout>
    </AuthGuard>
  );
};

export default Resources;
