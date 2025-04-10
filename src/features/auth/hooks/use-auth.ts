"use client";

import { User as AuthUser } from "lucia";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "../queries/get-auth";

export const useAuth = () => {
  //const { user } = await getAuth();

  // we are making the following change (using useState and useEffect) inseatd of just using - const { user } = await getAuth(); is that using getAuth() makes this entire page a dynamic page because getAuth is using cookies(). I think the course instructor would like to keep this a static page becuase it can be cached during build time and this cache is bieng revalidated everytime a new ticket is added or edited. In order to keep this as a dymanic page, the instrucor changed the header component to a client component and made getAuth() function into a server action as getAuth() cannot be used on the client side (now that we changed header into a client component) because of using cookies API which can only be excuted on server. For more information on when to use server actions and when to use general function, take a look at this file: when-to-use-server-actions-and-geenral-functions.md

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const pathname = usePathname(); //This is to render the header component on root layout when user naigates between signed-in pages and signed out pages

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};
