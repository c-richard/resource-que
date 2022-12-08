import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Layout } from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { Button } from "../../../components/Button";
import { AuthGuard } from "../../../components/AuthGuard";
import { Input } from "../../../components/Input";

const createRequestSchema = z.object({
  description: z.string().nullable(),
});

const CreateRequest: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const utils = trpc.useContext();

  const requestAccess = trpc.proposal.requestAccess.useMutation({
    onSuccess: () => {
      utils.resource.getById.invalidate();
      router.push(`/resources/${id}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRequestSchema),
  });

  function onCreateRequest(data: unknown) {
    const request = createRequestSchema.parse(data);
    if (typeof id !== "string") return;

    requestAccess.mutate({ resourceId: id, ...request });
  }

  return (
    <AuthGuard>
      <Layout title="Create Proposal">
        <h1>Create Proposal</h1>
        <form onSubmit={handleSubmit(onCreateRequest)}>
          <Input
            name="description"
            register={register}
            error={errors.name?.message}
          />
          <Button type="submit">Create</Button>
        </form>
      </Layout>
    </AuthGuard>
  );
};

export default CreateRequest;
