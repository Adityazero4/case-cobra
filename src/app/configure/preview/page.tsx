import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignPreview from "./DesignPreview";

interface PageParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ searchParams }: PageParams) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
};

export default page;
