import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "@/components/login-form";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <div className="w-full flex items-center justify-between mt-8 px-8 absolute top-0">
        <Link href="/">
          <ArrowBigLeft />
        </Link>
        <ModeToggle />
      </div>
      <div className="px-8">
        <LoginForm />
      </div>
    </main>
  );
}