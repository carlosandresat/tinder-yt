import { getTopMatches } from "@/actions/match-data";
import { MatchCard } from "@/components/match-card";

export async function MatchSection() {
  const matches = await getTopMatches();

  return (
    <div className="flex flex-col w-full">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center">
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
          />
        ))}
      </div>
    </div>
  );
}
