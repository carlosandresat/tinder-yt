import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Lista de Bloqueados
      </h1>
      <p className="text-muted-foreground max-w-screen-lg px-8 pt-2 text-center">
        ¿Tienes a alguien que no quieres ni ver? Agréga aquí a tu ex, a tus amix
        o a quelquiera que no quieras ver en TinderYT. No te preocupes, no se
        enterarán de que los bloqueaste.
      </p>
      <div className="space-y-2 px-8 mt-8">
        <Label htmlFor="blocked_email" className="text-base">
          Email de usuario
        </Label>
        <div className="flex items-center space-x-2">
          <Input id="blocked_email" placeholder="nombre.apellido" />
          <span className="text-muted-foreground">@yachaytech.edu.ec</span>
        </div>
        <Button className="flex justify-self-end">Añadir</Button>
      </div>
    </>
  );
}
