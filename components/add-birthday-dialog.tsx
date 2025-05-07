import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { AddBirthdayForm } from "@/components/add-birthday-form";

export function AddBirthdayDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex justify-self-center">Verifica tu edad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añade tu fecha de nacimiento</DialogTitle>
          <DialogDescription>
            Para verificar tu edad, por favor añade tu fecha de nacimiento. Esta
            información no será compartida con otros usuarios.
          </DialogDescription>
        </DialogHeader>

        <AddBirthdayForm />
      </DialogContent>
    </Dialog>
  );
}
