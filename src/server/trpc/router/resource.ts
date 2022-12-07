import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

const createResource = z.object({
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
});

const updateResource = z.object({
  id: z.string(),
  resource: createResource,
});

export const resourceRouter = router({
  create: protectedProcedure
    .input(createResource)
    .mutation(({ ctx, input }) => ctx.prisma.resource.create({ data: input })),
  update: protectedProcedure
    .input(updateResource)
    .mutation(({ ctx, input }) => {
      ctx.prisma.resource.findFirstOrThrow({
        where: { id: input.id, ownerId: ctx.session.user.id },
      });

      return ctx.prisma.resource.update({
        where: { id: input.id },
        data: input.resource,
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    ctx.prisma.resource.findFirstOrThrow({
      where: { id: input, ownerId: ctx.session.user.id },
    });

    return ctx.prisma.resource.delete({
      where: { id: input },
    });
  }),
  getByUserId: protectedProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.resource.findMany({
      where: { ownerId: input },
    })
  ),
  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.resource.findFirstOrThrow({
      where: { id: input },
      include: { proposals: { include: { owner: true } } },
    })
  ),
});
