"use client";
import { Kanban } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import { Button, buttonVariants } from "../../components/ui/button";
import { AccountDropdown } from "./account-dropdown";

export default function Header() {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    // <form action={signOut}>
    //   <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
    // </form>

    <AccountDropdown user={user} />
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
    <nav className="header-from-top flex justify-between px-5 py-2.5 border-b w-full bg-background/95 backdrop-blur fixed left-0 right-0 top-0 z-20 supports-backdrop-blur:bg-background/60">
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
