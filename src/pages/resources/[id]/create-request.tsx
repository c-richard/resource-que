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
  description: z.string().optional(),
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
      <Layout title="Request Resource">
        <h1 className="mx-4 text-base tracking-wide tracking-wider text-gray-500">
          Request Resource
        </h1>
        <form
          onSubmit={handleSubmit(onCreateRequest)}
          className="my-2 border-2 border-gray-200 bg-gray-100 p-8 px-6 shadow-md"
        >
          <Input
            name="description"
            register={register}
            error={errors.name?.message}
            placeholder="Why do you need this?"
          />
          <Button type="submit" variant="primary">
            Request
          </Button>
        </form>
      </Layout>
    </AuthGuard>
  );
};

export default CreateRequest;
