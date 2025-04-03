import { MatchCard } from "@/components/match-card";

export function MatchSection() {
  const matchsData = [
    {
      unlocked: true,
      score: 975,
      image: "/me.jpg",
      name: "Carlos Arévalo",
      description: "This is a generic description lol equisde ajio ajio ajio, a veces quisiera comer tartas con limón.",
      contact: "Instagram: @carlosandresat",
      answers: {
        question1: "2",
        question2: ["1", "2", "5"],
        question3: 3
      }
    },
    {
      unlocked: false,
      score: 845,
      image: null,
      name: null,
      description: null,
      contact: null,
      answers: {
        question1: "1",
        question2: ["3", "4", "5"],
        question3: 5
      }
    },
    {
      unlocked: false,
      score: 759,
      image: null,
      name: null,
      description: null,
      contact: null,
      answers: {
        question1: "1",
        question2: ["1", "2", "4"],
        question3: 1
      }
    }
  ]
  return (
    <div className="flex flex-col w-full">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight self-center">
        Tus Matchs:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {matchsData.map((match, index) => (
          <MatchCard
            key={index}
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
