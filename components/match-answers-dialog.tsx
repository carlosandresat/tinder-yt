import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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

interface MatchAnswers {
  tier: number;
  name: string | null;
  question1: string | null;
  question2: string | null;
  question3: string | null;
  question4: string | null;
  question5: string[];
  question6: string[];
  question7: string[];
  question8: string[];
  question9: number | null;
  question10: number | null;
  question11: number | null;
  question12: number | null;
  question13: number | null;
  question14: number | null;
  question15: number | null;
}

export function MatchAnswersDialog({
  tier,
  name,
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  question14,
  question15,
}: MatchAnswers) {
  const question3options = [
    "Mensaje de opción 1",
    "Mensaje de opción 2",
    "Mensaje de opción 3",
    "Mensaje de opción 4",
    "Mensaje de opción 5",
    "Mensaje de opción 6",
    "Mensaje de opción 7"
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver respuestas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl overflow-y-scroll max-h-[80%]">
        <DialogHeader>
          <DialogTitle>{name ? name : `Match #${tier}`}</DialogTitle>
          <DialogDescription>
            Estas fueron las respuestas de tu match
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <Label htmlFor="question2">Pregunta 1</Label>
            {question1 ? (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap"
                value={question1}
                id="question1"
              >
                <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
                <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
              </ToggleGroup>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="question2">Pregunta 2</Label>
            {question2 ? (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap"
                value={question2}
                id="question23"
              >
                <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
                <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
              </ToggleGroup>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="question3">Pregunta 3</Label>
            {question3 ? (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap"
                value={question3}
                id="question3"
              >
                <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
                <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
              </ToggleGroup>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="question4">Pregunta 4</Label>
            {question4 ? (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap"
                value={question4}
                id="question4"
              >
                <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
                <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
              </ToggleGroup>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="question5">Pregunta 5</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap"
              value={question5}
              id="question5"
            >
              <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
              <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
              <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question6">Pregunta 6</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap"
              value={question6}
              id="question6"
            >
              <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
              <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
              <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question7">Pregunta 7</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap"
              value={question7}
              id="question7"
            >
              <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
              <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
              <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="question8">Pregunta 8</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex-wrap"
              value={question8}
              id="question8"
            >
              <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
              <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
              <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label>Pregunta 9</Label>
            {question9 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question9]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question9 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 10</Label>
            {question10 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question10]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question10 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 11</Label>
            {question11 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question11]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question11 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 12</Label>
            {question12 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question12]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question12 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 13</Label>
            {question13 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question13]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question13 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 14</Label>
            {question14 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question14]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question14 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Pregunta 15</Label>
            {question15 ? (
              <>
                <div className="flex gap-6 w-full items-center justify-between">
                  <p>1</p>
                  <Slider min={1} max={7} step={1} value={[question15]} />
                  <p>7</p>
                </div>
                <div className="text-center text-sm">
                  {question3options[question15 - 1]}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Este usuario no ha respondido a esta pregunta
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
