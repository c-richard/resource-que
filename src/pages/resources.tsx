import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { Button } from "../components/Button";
import { Resource } from "../components/Resource";
import { AuthGuard } from "../components/AuthGuard";

const Resources: NextPage = () => {
  const router = useRouter();
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
              <Resource key={r.id} {...r} />
            ))}
          </ul>
        )}
        <Button onClick={() => router.push("/create-new-resource")}>
          Create +
        </Button>
      </Layout>
    </AuthGuard>
  );
};

export default Resources;
