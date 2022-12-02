import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

const zResource = z.object({
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
})

export const resourceRouter = router({
  create: protectedProcedure.input(zResource).mutation(({ ctx, input }) => ctx.prisma.resource.create({ data: input })),
  getByUserId: protectedProcedure.input(z.string()).query(
    ({ ctx, input }) => ctx.prisma.resource.findMany({ where: { ownerId: input } })
  ),
});
