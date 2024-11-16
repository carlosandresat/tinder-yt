import { MatchSection } from "@/components/match-section";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileForm } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { VerificationForm } from "@/components/verification-form";
import Link from "next/link";

export default function Page() {
    return (
      <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8"><ModeToggle /><Button asChild>
        <Link href="/">Salir</Link>
      </Button></div>
      <ProfileForm />
      <VerificationForm />
      <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8">
      <MatchSection /></div>
    </main>
    )
  }