import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "@/components/login-form";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <ArrowBigLeft />
        </Link>
        <ModeToggle />
      </div>
        <Card className="m-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Entrar</CardTitle>
            <CardDescription>
              Ingresa tus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
    </main>
  );
}
