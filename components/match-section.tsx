import { getAvailableUnlocks, getTopMatches } from "@/actions/match-data";
import { MatchCard } from "@/components/match-card";
import { PaymentDialog } from "@/components/payment-dialog";
import { Button } from "@/components/ui/button";

export async function MatchSection() {
  const matches = await getTopMatches();
  const availableUnlocks = await getAvailableUnlocks();
  const hasAvailableUnlocks = availableUnlocks > 0;

  return (
    <div className="flex flex-col w-full max-w-screen-xl p-8">
      <div className="text-lg font-semibold self-end">Desbloqueos disponibles: {availableUnlocks}</div>
      <PaymentDialog>
        <Button variant="secondary" className="self-end mt-2">¿Quieres más desbloqueos?</Button>
      </PaymentDialog>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center mt-6">
        Tus Matchs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {matches.map((match, index) => (
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
    </div>
  );
}
