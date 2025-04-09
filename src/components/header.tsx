"use client";

import { Kanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import ThemeSwitcher from "./theme/theme-switcher";
import { Button, buttonVariants } from "./ui/button";
import SubmitButton from "./form/submit-button";
import { signOut } from "@/features/auth/actions/sign-out";
import { getAuth } from "@/features/auth/queries/get-auth";
import { useEffect, useState } from "react";
import { User as AuthUser } from "lucia";

export default function Header() {
  //const { user } = await getAuth();

  // we are making the following change (using useState and useEffect) inseatd of just using - const { user } = await getAuth(); is that using getAuth() makes this entire page a dynamic page because getAuth is using cookies(). I think the course instructor would like to keep this a static page becuase it can be cached during build time and this cache is biend revalidated everytime a new ticket is added or edited. I order to keep this as a dymanic page, the instrucor changed the header component to a client component and made getAuth() function into a server action as getAuth() cannot be used on the client side (now that we changed header into a client component) because of using cookies API which can only be excuted on server. For more information on when to use server actions and when to use general function, take a look at this file: when-to-use-server-actions-and-geenral-functions.md

  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
    };
    fetchUser();
  }, []);

  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        // another way of rendering button from shadcn
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>

      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav className="flex justify-between px-5 py-2.5 border-b w-full bg-background/95 backdrop-blur fixed left-0 right-0 top-0 z-20 supports-backdrop-blur:bg-background/60">
      <div className="flex items-center gap-x-2">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <Kanban />
            <h1 className="text-lg font-semibold">TicketQuest</h1>
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}
