import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { Button } from "../../../components/Button";
import { AuthGuard } from "../../../components/AuthGuard";
import { useSession } from "next-auth/react";
import { Heading } from "../../../components/Heading";
import { Card } from "../../../components/Card";
import { Link } from "../../../components/Link";
import { default as NextLink } from "next/link";
import { Proposal, User } from "@prisma/client";
import ProposalSummary from "../../../components/ProposalSummary";

function getSortedUsers(proposals: (Proposal & { owner: User })[] = []) {
  const sortedProposals = proposals.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  return sortedProposals;
}

const ResourceDetailed: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const utils = trpc.useContext();
  const { data: sessionData } = useSession();
  const { data: resource } = trpc.resource.getById.useQuery(id as string);

  const unRequestAccess = trpc.proposal.unRequestAccess.useMutation({
    onSuccess: async () => {
      await utils.resource.getById.invalidate();
    },
  });

  const deleteResource = trpc.resource.delete.useMutation({
    onSuccess: async () => {
      await utils.resource.getByUserId.invalidate();
      await utils.resource.getById.invalidate();
      router.push("/resources");
    },
  });

  const [currentProposal, ...remainingProposals] = getSortedUsers(
    resource?.proposals
  );

  return (
    <AuthGuard>
      <Layout title="Resource">
        <Heading className="mb-2">
          {resource?.name}
          <NextLink
            href={`/resources/${resource?.id}/edit`}
            className="flex items-center justify-center p-3"
          >
            <span className="material-symbols-outlined text-slate-500">
              edit
            </span>
          </NextLink>
        </Heading>
        <p className="text-slate-600">{resource?.description}</p>
        {currentProposal ? (
          <>
            <Heading className="mt-8">Current User</Heading>
            <ProposalSummary
              position={1}
              proposal={currentProposal}
              isOwner={
                sessionData?.user !== undefined &&
                currentProposal.ownerId === sessionData?.user?.id
              }
            />
          </>
        ) : (
          <Link
            href={`/resources/${resource?.id}/create-request`}
            variant="primary"
          >
            Request Access
          </Link>
        )}
        {resource && (
          <ul>
            {remainingProposals.length > 0 && (
              <li>
                <Heading className="mt-8">Queue</Heading>
                {[
                  ...remainingProposals,
                  ...remainingProposals,
                  ...remainingProposals,
                ].map((p, i) => (
                  <Card key={p.id}>
                    <ProposalSummary
                      position={i + 2}
                      proposal={p}
                      isOwner={
                        sessionData?.user !== undefined &&
                        p.ownerId === sessionData?.user?.id
                      }
                    />
                  </Card>
                ))}
              </li>
            )}
          </ul>
        )}
      </Layout>
    </AuthGuard>
  );
};

export default ResourceDetailed;

// {
//   /* <>
//   <Link href={`/resources/${resource.id}/edit`} variant="secondary">
//     Edit
//   </Link>
//   <Button
//     onClick={() => deleteResource.mutate(resource.id)}
//     variant="tertiary"
//   >
//     Delete
//   </Button>
// </> */
// }
