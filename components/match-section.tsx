import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function MatchSection() {
  return (
    <div className="flex flex-col w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center">
        Tus Matchs:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>#1</CardTitle>
            <CardDescription>89% compatibilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/logo.webp" alt="Profile picture preview" />
                <AvatarFallback>Foto</AvatarFallback>
              </Avatar>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Carlos Arévalo
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="secondary">Desbloquear</Button>
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>#2</CardTitle>
            <CardDescription>85% compatibilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/logo.webp" alt="Profile picture preview" />
                <AvatarFallback>Foto</AvatarFallback>
              </Avatar>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Carlos Arévalo
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="secondary">Desbloquear</Button>
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>#3</CardTitle>
            <CardDescription>78% compatibilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/logo.webp" alt="Profile picture preview" />
                <AvatarFallback>Foto</AvatarFallback>
              </Avatar>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Carlos Arévalo
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="secondary">Desbloquear</Button>
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
