import { auth } from "@/auth";
import { AddBirthdayDialog } from "@/components/add-birthday-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default async function Page() {
  const session = await auth();
  const age: number | null = null; // Placeholder for age, replace with actual logic to fetch user's age

  if (!session?.user) {
    return (
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        No has iniciado sesión
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Perfil de usuario
      </h1>
      <div className="w-32 h-32 rounded-full mt-8">
        <Image
          src={session.user.image ?? ""}
          alt="User Avatar"
          className="rounded-full w-full h-full object-cover"
          width={128}
          height={128}
        />
      </div>
      <h2 className="text-xl font-semibold tracking-tight mt-4">
        {session.user.name}
      </h2>

      <div className="flex flex-col space-y-8 sm:max-w-2xl w-full px-8 mt-8 pb-28">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description" className="text-base">
            Descripción
          </Label>
          <Textarea
            id="description"
            placeholder="Escribe algo sobre ti..."
            className="resize-none h-32 w-full "
            defaultValue="Descripción de ejemplo"
          />
          <Button className="self-end">
            <Save />
            Guardar
          </Button>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="age" className="text-base">
            Edad
          </Label>
          {age ? (
            <div className="flex items-end justify-center space-x-2">
              <p className="text-2xl">{age}</p>
              <p className="text-muted-foreground">años</p>
            </div>
          ) : (
            <AddBirthdayDialog />
          )}
        </div>
        <Separator />
        <div className="flex flex-col">
          <p className="text-base">Redes sociales</p>
          <p className="text-sm text-muted-foreground">
            Agrega tus redes sociales para que otros usuarios puedan contactarte
          </p>
          <div className=" space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base">
                Whatsapp
              </Label>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/whatsapp.png"
                  alt="Whatsapp Icon"
                  height={26}
                  width={26}
                  className=" dark:invert"
                />
                <Input
                  id="whatsapp"
                  placeholder="+593999999999"
                  defaultValue="+593987654321"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-base">
                Instagram
              </Label>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/instagram.png"
                  alt="Instagram Icon"
                  height={26}
                  width={26}
                  className=" dark:invert"
                />
                <Input
                  id="instagram"
                  placeholder="@tu_instagram"
                  defaultValue="@ejemplo_instagram"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-base">
                Facebook
              </Label>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/facebook.png"
                  alt="Facebook Icon"
                  height={26}
                  width={26}
                  className=" dark:invert"
                />
                <Input
                  id="facebook"
                  placeholder="Tu Facebook"
                  defaultValue="https://www.facebook.com/ejemplo"
                />
              </div>
            </div>
          </div>
          <Button className="self-end mt-4">
            <Save />
            Guardar
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2">
          <p>Abierto a</p>
          <ToggleGroup type="multiple" className="w-full" variant="outline">
            <ToggleGroupItem value="amistad">Amistad</ToggleGroupItem>
            <ToggleGroupItem value="amor">Amor</ToggleGroupItem>
            <ToggleGroupItem value="vacile">Vacile</ToggleGroupItem>
          </ToggleGroup>
          <Button className="self-end mt-4">
            <Save />
            Guardar
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <p>Intereses</p>
            <p className="text-sm text-muted-foreground">Máximo 3</p>
          </div>
          <ToggleGroup
            type="multiple"
            className="w-full flex-wrap"
            variant="outline"
          >
            <ToggleGroupItem value="deportes">Deportes</ToggleGroupItem>
            <ToggleGroupItem value="musica">Música</ToggleGroupItem>
            <ToggleGroupItem value="arte">Arte</ToggleGroupItem>
            <ToggleGroupItem value="ciencia">Ciencia</ToggleGroupItem>
            <ToggleGroupItem value="tecnologia">Tecnología</ToggleGroupItem>
            <ToggleGroupItem value="cultura">Cultura</ToggleGroupItem>
            <ToggleGroupItem value="viajes">Viajes</ToggleGroupItem>
            <ToggleGroupItem value="gastronomia">Gastronomía</ToggleGroupItem>
            <ToggleGroupItem value="naturaleza">Naturaleza</ToggleGroupItem>
            <ToggleGroupItem value="fotografia">Fotografía</ToggleGroupItem>
            <ToggleGroupItem value="moda">Moda</ToggleGroupItem>
            <ToggleGroupItem value="cine">Cine</ToggleGroupItem>
            <ToggleGroupItem value="videojuegos">Videojuegos</ToggleGroupItem>
            <ToggleGroupItem value="literatura">Literatura</ToggleGroupItem>
            <ToggleGroupItem value="historia">Historia</ToggleGroupItem>
            <ToggleGroupItem value="filosofia">Filosofía</ToggleGroupItem>
            <ToggleGroupItem value="animales">Animales</ToggleGroupItem>
          </ToggleGroup>
          <Button className="self-end mt-4">
            <Save />
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
}
