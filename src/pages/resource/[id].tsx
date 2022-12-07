import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../../components/Input";
import { AuthGuard } from "../../components/AuthGuard";
import { useSession } from "next-auth/react";

const createResourceSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().nullish(),
});

const ResourceEdit: NextPage = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { data: sessionData } = useSession();
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
      router.push("/resources");
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

  useEffect(() => {
    if (
      resource &&
      sessionData?.user &&
      resource.ownerId &&
      resource.id !== sessionData.user.id
    ) {
      router.push(`/resources`);
    }
  });

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
