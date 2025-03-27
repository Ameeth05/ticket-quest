"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicket = async (id: string, formData: FormData) => {
  const data = {
    // id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    data: {
      title: data.title as string,
      content: data.content as string,
    },
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
