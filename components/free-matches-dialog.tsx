import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function FreeMatchesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Obtén desbloqueos gratis</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Desbloqueos gratis</DialogTitle>
          <DialogDescription>
            Averígua cómo obtener desbloqueos gratis para tus matchs.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="rounded-full h-16 w-16 border">
                  <Image
                    src="/media-icons/github.png"
                    alt="Github Icon"
                    width={80}
                    height={80}
                    className="dark:invert p-2"
                  />
                </div>
                <CardTitle>Sígueme en GitHub</CardTitle>
              </div>
              <CardDescription>
                GitHub es una plataforma que permite organizar y gestionar
                proyectos de código. No solo para estudiantes de Ciencias
                Computacionales, también para Químicos, Físicos, Matemáticos,
                etc. Aprender a usar GitHub es una excelente manera de mostrar
                tus trabajos y proyectos de la Universidad para futuras
                oportunidades laborales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-semibold">Paso 1:</span> Sigueme en
                GitHub.{" "}
                <a
                  href="https://github.com/carlosandresat"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  @carlosandresat
                </a>
              </p>
              <p>
                <span className="font-semibold">Paso 2:</span> Deja una estrella
                en uno de los repositorios como{" "}
                <a
                  href="https://github.com/carlosandresat/tinder-yt"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  TinderYT
                </a>{" "}
                o{" "}
                <a
                  href="https://github.com/carlosandresat/tuto-u"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  Tuto-U
                </a>{" "}
                (o ambos 😁)
              </p>
              <p>
                <span className="font-semibold">Paso 3:</span> Envía un correo
                electrónico a{" "}
                <a
                  href="mailto:carlosandresat@hotmail.com"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  carlosandresat@hotmail.com
                </a>{" "}
                indicando tu nombre de usuario de GitHub y tu correo electrónico
                de registro para acreditar{" "}
                <span className="font-semibold">
                  1 desbloqueo de match gratis
                </span>
                .
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Próximamente más formas de obtener desbloqueos gratis...
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
