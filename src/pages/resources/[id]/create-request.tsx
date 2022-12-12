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
import { Form } from "../../../components/Form";
import { Heading } from "../../../components/Heading";

const createRequestSchema = z.object({
  description: z.string().optional(),
});

const CreateRequest: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const utils = trpc.useContext();

  const requestAccess = trpc.proposal.requestAccess.useMutation({
    onSuccess: async () => {
      await utils.resource.getById.invalidate();
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
        <Heading>Request Resource</Heading>
        <Form onSubmit={handleSubmit(onCreateRequest)}>
          <Input
            name="description"
            register={register}
            error={errors.name?.message}
            placeholder="What will you do with this resource?"
          />
          <Button type="submit" variant="primary">
            Request
          </Button>
        </Form>
      </Layout>
    </AuthGuard>
  );
};

export default CreateRequest;
