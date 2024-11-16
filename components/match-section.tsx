import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MatchSection() {
  return (
    <div className="flex flex-col w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center">
        Tus Matchs:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/logo.webp" alt="Profile picture preview" />
                <AvatarFallback>Foto</AvatarFallback>
              </Avatar>

              <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
                Nombre de la persona
              </CardTitle>
            </div>
            <CardDescription className="mt-8">
              Descripción del perfil bla bla bla bla bla ewufhwe fewipu fhuwep
              hfpew pf eup Soy una persona túnica y detergente. AAaaaaa no sé
              que más poner. Papas fritas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
