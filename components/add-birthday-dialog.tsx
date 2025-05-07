import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 sm:col-span-1">
            <Label htmlFor="day">Día</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Día" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <SelectItem key={day} value={String(day)}>
                    {String(day).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <Label htmlFor="month">Mes</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">Enero</SelectItem>
                <SelectItem value="02">Febrero</SelectItem>
                <SelectItem value="03">Marzo</SelectItem>
                <SelectItem value="04">Abril</SelectItem>
                <SelectItem value="05">Mayonesa</SelectItem>
                <SelectItem value="06">Junio</SelectItem>
                <SelectItem value="07">Julio</SelectItem>
                <SelectItem value="08">Agosto</SelectItem>
                <SelectItem value="09">Septiembre</SelectItem>
                <SelectItem value="10">Octubre</SelectItem>
                <SelectItem value="11">Noviembre</SelectItem>
                <SelectItem value="12">Diciembre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <Label htmlFor="year">Año</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
