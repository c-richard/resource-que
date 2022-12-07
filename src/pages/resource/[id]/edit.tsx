import React from "react";
import { useForm } from "react-hook-form";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import * as z from "zod";

import { Layout } from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { Button } from "../../../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/Input";
import { AuthGuard } from "../../../components/AuthGuard";

const createResourceSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().nullish(),
});

const ResourceEdit: NextPage = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createResourceSchema),
  });

  const editResource = trpc.resource.update.useMutation({
    onSuccess: () => {
      utils.resource.getByUserId.invalidate();
      utils.resource.getById.invalidate();
      router.push(`/resource/${resource?.id}`);
    },
  });

  const { data: resource } = trpc.resource.getById.useQuery(id as string, {
    onSuccess: (resource) => {
      reset(resource);
    },
  });

  function onEditResource(data: unknown) {
    const newResource = createResourceSchema.parse(data);
    if (resource === undefined) return;

    editResource.mutate({
      id: resource.id,
      resource: { ...resource, ...newResource },
    });
  }

  return (
    <AuthGuard>
      <Layout title="Edit">
        <h1>Edit Resource</h1>
        <form onSubmit={handleSubmit(onEditResource)}>
          <Input name="name" register={register} error={errors.name?.message} />
          <Input
            name="description"
            register={register}
            error={errors.name?.message}
          />
          <Button type="submit">Update</Button>
        </form>
      </Layout>
    </AuthGuard>
  );
};

export default ResourceEdit;
