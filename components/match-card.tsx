import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LockKeyhole, VenetianMask } from "lucide-react";
import { PaymentDialog } from "@/components/payment-dialog";
import { MatchAnswersDialog } from "@/components/match-answers-dialog";

interface MatchData {
  tier: number;
  unlocked: boolean;
  score: number;
  image: string | null;
  name: string | null;
  description: string | null;
  contact: string | null;
  answers: {
    question1: number;
    question2: string[];
    question3: number;
  };
}

export function MatchCard({
  tier,
  unlocked,
  score,
  image,
  name,
  description,
  contact,
  answers,
}: MatchData) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>#{tier}</CardTitle>
        <CardDescription>Compatibilidad: {score}/1000</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {unlocked && image ? (
            <div className="w-20 h-20">
              <Image
                src={image}
                alt="Profile picture preview"
                className="rounded-full h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-secondary rounded-full">
              <VenetianMask className="w-10 h-10" />
            </div>
          )}

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {unlocked ? name : `Match #${tier}`}
          </h4>
        </div>
      </CardContent>
      <CardFooter className={unlocked ? "justify-end" : "justify-between"}>
        {!unlocked ? <PaymentDialog /> : null}
        <MatchAnswersDialog />
      </CardFooter>
      {unlocked ? (
        <div className="flex flex-col p-6 border-t">
          <p className="leading-normal mt-2">{description}</p>
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-2">
            Redes sociales
          </h4>
          <p className="leading-normal">{contact}</p>
        </div>
      ) : (
        <div className="flex flex-col p-6 border-t justify-center items-center flex-grow space-y-2">
          <LockKeyhole />
          <p className="text-sm text-muted-foreground text-center">
            Desbloquea este match para conocer su nombre, descripción y redes
            sociales
          </p>
        </div>
      )}
    </Card>
  );
}
