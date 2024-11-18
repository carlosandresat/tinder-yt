import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function ForgotPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="ml-auto inline-block text-sm underline"
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reestablecer contraseña</DialogTitle>
          <DialogDescription>
            Sigue los siguientes pasos para reestablecer tu contraseña
          </DialogDescription>
        </DialogHeader>
        <ul className="ml-6 list-disc [&>li]:mt-2">
          <li>
            Entra a{" "}
            <a
              href="https://bcrypt-generator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bcrypt Generator
            </a>
          </li>
          <li>Escribe tu nueva contraseña en la sección de Encriptar</li>
          <li>Selecciona 10 rounds y da click en &apos;Encrypt&apos;</li>
          <li>
            Envía el hash generado al correo:{" "}
            <a
              href="mailto:carlosandresat@hotmail.com"
              target="_blank"
              className="underline"
            >
              carlosandresat@hotmail.com
            </a>
          </li>
        </ul>
        <DialogFooter>
            <p className="text-sm text-muted-foreground">No olvides enviar el hash de tu contraseña desde el correo institucional asociado a tu cuenta</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}