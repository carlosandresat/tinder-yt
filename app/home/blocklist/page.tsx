import { BlocklistForm } from "@/components/blocklist-form";
import { Button } from "@/components/ui/button";
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
      <BlocklistForm />
      <div className="flex justify-center max-w-screen-lg mt-8 px-8 w-full pb-28">
        <Table>
          <TableCaption>Lista de usuarios bloqueados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium break-all max-w-full">
                tumejor.amix@yachaytech.edu.ec
              </TableCell>
              <TableCell className="flex justify-end">
                <Button size="icon" variant="secondary">
                  <X />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium break-all">
                tuex.equisde@yachaytech.edu.ec
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
