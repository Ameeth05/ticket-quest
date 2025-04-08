import Link from "next/link";
import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        className="w-full max-w-[420px] animate-fade-in-from-top"
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Have an account? Sign in now
          </Link>
        }
      />
    </div>
  );
}
