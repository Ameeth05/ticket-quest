import { Kanban } from "lucide-react";
import Link from "next/link";
import { homePath, ticketsPath } from "@/paths";
import ThemeSwitcher from "./theme/theme-switcher";
import { Button } from "./ui/button";

export default function Header() {
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
        <Button asChild>
          <Link
            href={ticketsPath()}
            // another way of rendering button from shadcn
          >
            Tickets
          </Link>
        </Button>
      </div>
    </nav>
  );
}
