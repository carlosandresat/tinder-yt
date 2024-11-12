import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-screen-xl flex mt-8 px-8"><ModeToggle /></div>
      <div className="my-auto px-8 w-full">
        <LoginForm />
      </div>
    </main>
  )
}