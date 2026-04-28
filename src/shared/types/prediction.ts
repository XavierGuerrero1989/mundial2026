import type { Timestamp } from "firebase/firestore";

export type Prediction = {
  id: string;
  uid: string;
  matchId: string;
  predHomeScore: number;
  predAwayScore: number;
  pointsAwarded: number | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};