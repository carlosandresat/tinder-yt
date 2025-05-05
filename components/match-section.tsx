import { getAvailableUnlocks, getTopMatches } from "@/actions/match-data";
import { MatchCard } from "@/components/match-card";
import { PaymentDialog } from "@/components/payment-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FreeMatchesDialog } from "@/components/free-matches-dialog";

export async function MatchSection() {
  const matches = await getTopMatches();
  const availableUnlocks = await getAvailableUnlocks();
  const hasAvailableUnlocks = availableUnlocks > 0;
  const timeLeft = new Date("2025-04-28T05:00").getTime() - new Date().getTime();

  return (
    <div className="flex flex-col w-full max-w-screen-xl px-8 pb-28">
      <div className="text-lg font-semibold self-end">
        Desbloqueos disponibles: {availableUnlocks}
      </div>
      <div className=" flex flex-col md:flex-row md:space-x-4 items-end md:items-center md:justify-end mt-2 space-y-4 md:space-y-0">
        <FreeMatchesDialog />
        {
          //Time left with discount in hours and minutes with a countdown
          timeLeft > 0 ? (
            <div className="flex flex-col md:flex-row items-end md:items-center justify-center md:space-x-2">
              <h2 className="font-semibold text-right">
                ¡Descuento del 50% en desbloqueos! Quedan
              </h2>
              <Badge className="space-x-4">
                <p aria-live="polite" suppressHydrationWarning>
                  {Math.floor(timeLeft / (1000 * 60 * 60))} horas
                </p>
                <p aria-live="polite" suppressHydrationWarning>
                  {Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}{" "}
                  minutos
                </p>
              </Badge>
            </div>
          ) : null
        }
        <PaymentDialog>
          <Button variant="secondary" className="w-fit">
            ¿Quieres más desbloqueos?
          </Button>
        </PaymentDialog>
      </div>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center mt-6">
        Tus Matchs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {matches.slice(0, 15).map((match, index) => (
          <MatchCard
            key={match.matchId}
            matchId={match.matchId}
            tier={index + 1}
            unlocked={match.unlocked}
            score={match.score}
            image={match.image}
            name={match.name}
            description={match.description}
            contact={match.contact}
            answers={match.answers}
            hasAvailableUnlocks={hasAvailableUnlocks}
          />
        ))}
      </div>
      {matches.length > 15 && (
        <>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center mt-6">
            Matchs desbloqueados que ya no están en tu Top 15
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
            {matches.slice(15).map((match, index) => (
              <MatchCard
                key={match.matchId}
                matchId={match.matchId}
                tier={index + 16}
                unlocked={match.unlocked}
                score={match.score}
                image={match.image}
                name={match.name}
                description={match.description}
                contact={match.contact}
                answers={match.answers}
                hasAvailableUnlocks={hasAvailableUnlocks}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
