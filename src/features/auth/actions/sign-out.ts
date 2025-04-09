"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";
import { getAuth } from "../queries/get-auth";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await lucia.invalidateSession(session.id);

  const blankSessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    blankSessionCookie.name,
    blankSessionCookie.value,
    blankSessionCookie.attributes
  );

  redirect(signInPath());
};
