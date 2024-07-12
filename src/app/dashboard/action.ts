"use server";

import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

export const changeOrderStatus = async ({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: OrderStatus;
}) => {
  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: newStatus,
    },
  });
};
