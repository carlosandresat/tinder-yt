import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { VenetianMask, LockKeyhole } from "lucide-react";
import { PaymentDialog } from "@/components/payment-dialog";
import { MatchAnswersDialog } from "@/components/match-answers-dialog";

export function MatchSection() {
  return (
    <div className="flex flex-col w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center">
        Tus Matchs:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>#1</CardTitle>
            <CardDescription>89% compatible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20">
                <Image
                  src="/me.jpg"
                  alt="Profile picture preview"
                  className="rounded-full h-full w-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Carlos Arévalo
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <MatchAnswersDialog />
          </CardFooter>
          <div className="flex flex-col p-6 border-t">
            <p className="leading-normal mt-2">
              This is a generic description lol equisde ajio ajio ajio, a veces
              quisiera comer tartas con limón.
            </p>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-2">
              Redes sociales
            </h4>
            <p className="leading-normal">Intagram: @carlosandresat</p>
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>#2</CardTitle>
            <CardDescription>85% compatible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center bg-secondary rounded-full">
                <VenetianMask className="w-10 h-10" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Match #2
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <PaymentDialog />
            <Button>Ver respuestas</Button>
          </CardFooter>
          <div className="flex flex-col p-6 border-t justify-center items-center flex-grow space-y-2">
            <LockKeyhole />
            <p className="text-sm text-muted-foreground text-center">Desbloquea este match para conocer su nombre, descripción y redes sociales</p>
          </div>

        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>#3</CardTitle>
            <CardDescription>78% compatible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center bg-secondary rounded-full">
                <VenetianMask className="w-10 h-10" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Match #3
              </h4>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <PaymentDialog />
            <Button>Ver respuestas</Button>
          </CardFooter>
          <div className="flex flex-col p-6 border-t justify-center items-center flex-grow space-y-2">
            <LockKeyhole />
            <p className="text-sm text-muted-foreground text-center">Desbloquea este match para conocer su nombre, descripción y redes sociales</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
