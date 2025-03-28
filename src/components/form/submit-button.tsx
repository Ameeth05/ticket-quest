"use client";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
