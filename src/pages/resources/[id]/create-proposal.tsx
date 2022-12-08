import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { Button } from "../../../components/Button";
import { AuthGuard } from "../../../components/AuthGuard";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ResourceDetailed: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const utils = trpc.useContext();
  const { data: sessionData } = useSession();
  const { data: resource } = trpc.resource.getById.useQuery(id as string);

  const requestAccess = trpc.proposal.requestAccess.useMutation({
    onSuccess: () => {
      utils.resource.getById.invalidate();
    },
  });

  const unRequestAccess = trpc.proposal.unRequestAccess.useMutation({
    onSuccess: () => {
      utils.resource.getById.invalidate();
    },
  });

  const deleteResource = trpc.resource.delete.useMutation({
    onSuccess: () => {
      utils.resource.getByUserId.invalidate();
      utils.resource.getById.invalidate();
      router.push("/resources");
    },
  });

  return (
    <AuthGuard>
      <Layout title="Create Proposal">
        <h1>Create Proposal</h1>
      </Layout>
    </AuthGuard>
  );
};

export default ResourceDetailed;
