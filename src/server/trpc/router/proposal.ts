import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const proposalRouter = router({
  requestAccess: protectedProcedure
    .input(
      z.object({
        resourceId: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const foundProposal = await ctx.prisma.proposal.findFirst({
        where: { ownerId: ctx.session.user.id, resourceId: input.resourceId },
      });

      if (foundProposal !== null) {
        return;
      }

      return ctx.prisma.proposal.create({
        data: {
          ownerId: ctx.session.user.id,
          resourceId: input.resourceId,
          description: input.description,
          createdAt: new Date(),
        },
      });
    }),
  unRequestAccess: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const foundProposal = await ctx.prisma.proposal.findFirst({
        where: { ownerId: ctx.session.user.id, resourceId: input },
      });

      if (foundProposal === null) {
        return;
      }

      return ctx.prisma.proposal.delete({
        where: { id: foundProposal.id },
      });
    }),
});
