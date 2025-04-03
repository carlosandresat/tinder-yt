import { NextResponse } from "next/server";
import { getTopMatches } from "@/actions/match-data";

export async function GET() {
  try {
    const matches = await getTopMatches();

    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}