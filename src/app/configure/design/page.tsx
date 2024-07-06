import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configurations.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imgUrl, height, width } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imgUrl}
    />
  );
};

export default page;
