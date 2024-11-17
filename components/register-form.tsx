import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


export function RegisterForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registro</CardTitle>
        <CardDescription>Llena tus datos para ingresar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sex">Sexo</Label>
            <ToggleGroup type="single" id="sex" variant="outline">
              <ToggleGroupItem value="m">Masculino</ToggleGroupItem>
              <ToggleGroupItem value="f">Femenino</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre.apellido@yachaytech.edu.ec"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirma tu contraseña</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <p className="text-sm text-muted-foreground">
            Una vez creada tu cuenta tendrás que esperar el correo con tu código
            de verificación en las próximas horas. Enviaré los correos
            manualmente así que paciencia 😅
          </p>
          <Button type="submit" className="w-full">
            Crea tu cuenta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="underline">
            Entra aquí
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
