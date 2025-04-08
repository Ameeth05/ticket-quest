import { Kanban } from "lucide-react";
import Link from "next/link";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import ThemeSwitcher from "./theme/theme-switcher";
import { Button, buttonVariants } from "./ui/button";

export default function Header() {
  const navItems = (
    <>
      <Link
        href={ticketsPath()}
        // another way of rendering button from shadcn
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "outline" })}
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
