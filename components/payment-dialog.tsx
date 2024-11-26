import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PaymentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Desbloquear</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Desbloquea este match</DialogTitle>
          <DialogDescription>
            Sigue los pasos para desbloquear este match
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <p>Deposita $1 a alguna de las siguientes cuentas:</p>
          <ul className="ml-6 list-disc [&>li]:mt-2">
            <li>Bco. Pichincha: 2210281465</li>
            <li>Bco. Pacífico: 1050898442</li>
          </ul>
          <p className="mt-2 text-center">
            Nombre: Carlos Andrés Arévalo Torres
          </p>
          <p className="mt-2">
            Envía el comprobante al correo:{" "}
            <a
              href="mailto:carlosandresat@hotmail.com"
              target="_blank"
              className="underline"
            >
              carlosandresat@hotmail.com
            </a>{" "}
            indicando el número del match a desbloquear (#1, #2, #3...)
          </p>
        </div>
        <DialogFooter>
          <p className="text-sm text-muted-foreground">
            No olvides enviar el pago desde el correo institucional asociado a
            tu cuenta. Ten en cuenta que el desbloqueo podría demorar un poco
            hasta revisar el mensaje. Gracias por tu apoyo al proyecto 🙏
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
