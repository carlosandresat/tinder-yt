import { auth } from "@/auth";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold tracking-tight text-center">
          No has iniciado sesión
        </h1>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
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
    </main>
  );
}
