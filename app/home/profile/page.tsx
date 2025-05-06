import { auth } from "@/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
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
      <p className="text-lg text-muted-foreground mt-2">{session.user.email}</p>

      <div className="flex flex-col space-y-8 sm:max-w-2xl w-full px-8 mt-8 pb-28">
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">
            Descripción
          </Label>
          <Textarea
            id="description"
            placeholder="Escribe algo sobre ti..."
            className="resize-none h-32 w-full "
            defaultValue="Descripción de ejemplo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-base">
            Whatsapp
          </Label>
          <Input
            id="whatsapp"
            placeholder="+593999999999"
            defaultValue="+593987654321"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram" className="text-base">
            Instagram
          </Label>
          <Input
            id="instagram"
            placeholder="@tu_instagram"
            defaultValue="@ejemplo_instagram"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook" className="text-base">
            Facebook
          </Label>
          <Input
            id="facebook"
            placeholder="Tu Facebook"
            defaultValue="https://www.facebook.com/ejemplo"
          />
        </div>
      </div>
    </>
  );
}
