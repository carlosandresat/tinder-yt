import { ModeToggle } from "@/components/mode-toggle";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8">
        TinderYT
      </h1>
      <ModeToggle />
    </main>
  );
}
