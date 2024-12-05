import { ModeToggle } from "@/components/mode-toggle";
import { RegisterForm } from "@/components/register-form";
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
    <main className="flex min-h-screen flex-col justify-center p-8 space-y-8 pb-24">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <ArrowBigLeft />
        </Link>
        <ModeToggle />
      </div>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Registro</CardTitle>
            <CardDescription>Llena tus datos para crear una cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
    </main>
  );
}