"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  "use server";
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  // The following is an example of on demand caching. It is part of Incremental Static Regeneration. When you use revalidatePath(), the cache is being invalidated and the data is fetched for the items in the page/path mentioned in brackets. The page/path is still considered to be a static path. 
  revalidatePath(ticketsPath());

  //redirects to a particular page after delete operation
  redirect(ticketsPath());
};
