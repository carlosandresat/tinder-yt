"use client";

import { calculateAllMatches } from "@/actions/match-data";
import { Button } from "@/components/ui/button";

export function StartMatchesButton() {
  async function handleClick() {
    await calculateAllMatches();
  }

  return <Button onClick={handleClick}>Iniciar Matches</Button>;
}
