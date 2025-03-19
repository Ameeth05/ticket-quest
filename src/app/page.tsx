import Link from "next/link";
import { ticketsPath } from "@/paths";

export default function Home() {
  return (
    <div>
      <h2 className="text-lg">Home Page</h2>
      <Link href={ticketsPath()}>Go to tickects page</Link>
    </div>
  );
}
