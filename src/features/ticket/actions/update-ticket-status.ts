"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
};
