import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../../components/Input";
import { AuthGuard } from "../../components/AuthGuard";
import { Form } from "../../components/Form";
import { Heading } from "../../components/Heading";

const createResourceSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string(),
});

const CreateNewResource: NextPage = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;

  const createResource = trpc.resource.create.useMutation({
    onSuccess: () => {
      utils.resource.getByUserId.invalidate();
      router.push("/resources");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createResourceSchema),
  });

  function onCreateResource(data: unknown) {
    const newResource = createResourceSchema.parse(data);
    if (userId === undefined) return;

    createResource.mutate({
      ...newResource,
      ownerId: userId,
    });
  }

  return (
    <AuthGuard>
      <Layout title="Create">
        <Heading>Create New Resource</Heading>
        <Form onSubmit={handleSubmit(onCreateResource)}>
          <Input
            name="name"
            register={register}
            error={errors.name?.message}
            placeholder="Name"
          />
          <Input
            name="description"
            register={register}
            error={errors.name?.message}
            placeholder="Description"
          />
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </Layout>
    </AuthGuard>
  );
};

export default CreateNewResource;
