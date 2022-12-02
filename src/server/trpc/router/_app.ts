import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { resourceRouter } from "./resource";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  resource: resourceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
