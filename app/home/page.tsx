import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
      <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8"><ModeToggle /><Button asChild>
        <Link href="/">Salir</Link>
      </Button></div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8">
        This is Home
      </h1>
      
    </main>
    )
  }