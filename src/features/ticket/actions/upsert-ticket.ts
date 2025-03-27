"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const upsertTicket = async (
  id: string | undefined,
  formData: FormData
) => {
  const data = {
    // id: formData.get("id"),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.upsert({
    where: {
      id: id || "",
    },
    update: data,
    create: data,
  });

  //   await prisma.ticket.update({
  //     data: {
  //       title: data.title as string,
  //       content: data.content as string,
  //     },
  //     where: {
  //       id,
  //     },
  //   });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }
};
