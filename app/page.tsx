import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-screen-xl flex mt-8 px-8"><ModeToggle /></div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8">
        TinderYT
      </h1>
      <Button asChild className="mt-8">
        <Link href="/home">Entrar</Link>
      </Button>
    </main>
  );
}