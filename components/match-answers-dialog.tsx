import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PaymentDialog } from "@/components/payment-dialog";

export function MatchAnswersDialog() {
  const question3options = [
    "Mensaje de opción 1",
    "Mensaje de opción 2",
    "Mensaje de opción 3",
    "Mensaje de opción 4",
    "Mensaje de opción 5",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver respuestas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Match #1</DialogTitle>
          <DialogDescription>
            Estas fueron las respuestas de tu match
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <Label htmlFor="question2">Pregunta 1</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex-wrap"
              value="2"
              id="question1"
            >
              <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question2">Pregunta 2</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap"
              value={["1", "2", "5"]}
              id="question2"
            >
              <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
              <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
              <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label>Pregunta 3</Label>
            <div className="flex gap-6 w-full items-center justify-between">
              <p>1</p>
              <Slider min={1} max={5} step={1} value={[4]}/>
              <p>5</p>
            </div>
            <div className="text-center text-sm">{question3options[3]}</div>
          </div>
        </div>
        <DialogFooter>
          <PaymentDialog />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
