import React from "react";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

// There are two important facts about authorization in layout components: First, the layout component is a *convenient* place to authorize users for all pages that share the same layout. But it is *not* the most secure place, because as we have learned, and this is important, a layout component does not re-render upon navigation from page to page. This means that if a session becomes invalid and the user is already in the application, they can still navigate to protected pages that share the same layout that is supposed to protect all pages.

// Second, it turns out that performing authorization checks only in the layout is insufficient and can be bypassed. By including the header RSC: 1, the server interprets the request as coming from a page attempting to load a server component. This causes the server to call the page function directly, bypassing the layout and its authorization check. By using this method, one would be able to successfully received the RSC payload response from the server, even if the user is not authenticated, where maybe all the sensitive data (e.g. tickets from another user) is encoded in the HTML.

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
