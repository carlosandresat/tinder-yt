import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ForgotPassword } from "@/components/forgot-password"
export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              <ForgotPassword />
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Ingresa
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="underline">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}