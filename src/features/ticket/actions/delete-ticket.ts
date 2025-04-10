"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }
    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  // The following is an example of on demand caching. It is part of Incremental Static Regeneration. When you use revalidatePath(), the cache is being invalidated and the data is fetched for the items in the page/path mentioned in brackets. The page/path is still considered to be a static path.
  revalidatePath(ticketsPath());

  await setCookieByKey("toast", "Ticket deleted");

  //redirects to a particular page after delete operation
  redirect(ticketsPath());
};
