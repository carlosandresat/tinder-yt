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
import { VenetianMask } from "lucide-react";

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
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
        <Card>
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
            <Button variant="secondary">Desbloquear</Button>
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
        <Card>
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
            <Button variant="secondary">Desbloquear</Button>
            <Button>Ver respuestas</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
