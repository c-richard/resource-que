import { Proposal, User } from "@prisma/client";
import { trpc } from "../utils/trpc";
import { Button } from "./Button";

function ProposalSummary({
  proposal,
  isOwner,
  position,
}: {
  proposal: Proposal & {
    owner: User;
  };
  isOwner: boolean;
  position: number;
}) {
  const utils = trpc.useContext();

  const unRequestAccess = trpc.proposal.unRequestAccess.useMutation({
    onSuccess: () => {
      utils.resource.getById.invalidate();
    },
  });

  return (
    <>
      <div className="flex items-center border-b-2 border-slate-200">
        <p className="mx-6 shrink-0 text-xl text-slate-700">{position}.</p>
        <img
          src={proposal.owner.image ?? undefined}
          alt={`Avatar of ${proposal.owner.name ?? "User"}`}
          className="saturate-25 my-5 h-16 w-16 rounded-full brightness-125"
        />
        <div className="my-3 ml-6 grow">
          <span className="font-bold text-slate-600">
            {proposal.owner.name}
          </span>
          <p className="text-slate-600">{proposal.description}</p>
        </div>
        <div>
          {isOwner && (
            <button
              className="m-3 ml-0 flex items-center justify-center p-3"
              onClick={() => unRequestAccess.mutate(proposal.resourceId)}
            >
              <span className="material-symbols-outlined text-slate-400">
                delete
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProposalSummary;
