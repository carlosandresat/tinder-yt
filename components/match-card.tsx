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
import { UnlockMatchDialog } from "@/components/unlock-match-dialog";
import { Button } from "@/components/ui/button";

interface MatchData {
  matchId: number;
  tier: number;
  unlocked: boolean;
  score: number;
  image: string | null;
  name: string | null;
  description: string | null;
  contact: string | null;
  answers: {
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
  };
  hasAvailableUnlocks: boolean;
}

export function MatchCard({
  matchId,
  tier,
  unlocked,
  score,
  image,
  name,
  description,
  contact,
  answers,
  hasAvailableUnlocks,
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

          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {unlocked ? name : `Match #${tier}`}
          </h2>
        </div>
      </CardContent>
      <CardFooter className={unlocked ? "justify-end" : "justify-between"}>
        {!unlocked && hasAvailableUnlocks ? (
          <UnlockMatchDialog matchId={matchId} />
        ) : !unlocked && !hasAvailableUnlocks ? (
          <PaymentDialog>
            <Button variant="secondary">Desbloquear</Button>
          </PaymentDialog>
        ) : null}
        <MatchAnswersDialog tier={tier} name={name} {...answers} />
      </CardFooter>
      {unlocked ? (
        <div className="flex flex-col p-6 border-t">
          <p className="leading-normal mt-2 break-words">{description}</p>
          <p className="scroll-m-20 text-lg font-semibold tracking-tight mt-2">
            Redes sociales
          </p>
          <p className="leading-normal break-words">{contact}</p>
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
