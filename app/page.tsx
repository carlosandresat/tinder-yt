/*import { Countdown } from "@/components/countdown";*/
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  {/*const releaseDate = new Date("2024-12-05T11:00");*/}

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full flex mt-8 px-8 absolute top-0"><ModeToggle /></div>
      <div className="w-40 h-40 rounded-full">
      <Image src="/logo.webp" width={800} height={800} alt="TinderYT Logo" className="rounded-full"></Image>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8">
        TinderYT
      </h1>
      <Button asChild className="mt-8">
        <Link href="/auth/register">Entrar</Link>
      </Button>
      {/*<div className="mt-8">
        <Countdown targetDate={releaseDate} />
      </div>*/}
    </main>
  );
}