"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      // id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: data,
      create: data,
    });
  } catch (error) {
    // For some reason following is not working but is working when returning from the server action when ticket is succesfully created (See below)
    // actionState.message = "Something went wrong";
    // return actionState;
    // return { message: "Something went wrong", payload: formData };
    return formErrorToActionState(error, formData);
  }

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

  //   actionState.message = "Ticket Created";
  return toActionState("SUCCESS", "Ticket Created");
};
