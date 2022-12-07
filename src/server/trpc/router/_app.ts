import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { proposalRouter } from "./proposal";
import { resourceRouter } from "./resource";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  resource: resourceRouter,
  proposal: proposalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
