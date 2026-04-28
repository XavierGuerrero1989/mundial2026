import type { Timestamp } from "firebase/firestore";

export type MatchStatus = "scheduled" | "live" | "finished";

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  group: string;
  kickoffAt: Timestamp;
  lockAt: Timestamp;
  status: MatchStatus;
  homeScore?: number | null;
  awayScore?: number | null;
};