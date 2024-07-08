"use server";
//This is a server action, meaning it will run on the server side
//this is a server action, beacuse it is interacting with the database
//we can use it in any other server action or client action

import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configurations.update({
    where: { id: configId },
    data: {
      color,
      finish,
      material,
      model,
    },
  });
}
