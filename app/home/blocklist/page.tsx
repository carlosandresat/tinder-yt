import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Lista de Bloqueados
      </h1>
      <p className="text-muted-foreground max-w-screen-lg px-8 pt-2 text-center">
        ¿Tienes a alguien que no quieres ni ver? Agrega aquí a tu ex, a tus amix
        o a cualquiera que no quieras ver en TinderYT. No te preocupes, no se
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
      <div className="flex justify-center max-w-screen-lg mt-8 px-8 w-full">
        <Table>
          <TableCaption>Lista de usuarios bloqueados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email (@yachaytech.edu.ec)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium break-all max-w-full">
                tumejor.amix
              </TableCell>
              <TableCell className="flex justify-end">
                <Button size="icon" variant="secondary">
                  <X />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium break-all">
                tuex.equisde
              </TableCell>
              <TableCell className="flex justify-end">
                <Button size="icon" variant="secondary">
                  <X />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
