import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import type { Match } from "../../../shared/types/match";

export function subscribeMatches(
  onData: (matches: Match[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const q = query(collection(db, "matches"), orderBy("kickoffAt", "asc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const matches: Match[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Match, "id">),
      }));
      onData(matches);
    },
    (err) => {
      console.error("Error leyendo matches:", err);
      onError?.(err);
    }
  );
}