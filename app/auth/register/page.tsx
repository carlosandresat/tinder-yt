import { ModeToggle } from "@/components/mode-toggle";
import { RegisterForm } from "@/components/register-form";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <div className="w-full flex items-center justify-between p-8">
        <Link href="/">
          <ArrowBigLeft />
        </Link>
        <ModeToggle />
      </div>
      <div className="px-8 pb-8">
        <RegisterForm />
      </div>
    </main>
  );
}