import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import type { Prediction } from "../../../shared/types/prediction";

type SavePredictionInput = {
  uid: string;
  matchId: string;
  predHomeScore: number;
  predAwayScore: number;
};

export async function savePrediction(input: SavePredictionInput) {
  const { uid, matchId, predHomeScore, predAwayScore } = input;
  const predictionId = `${uid}_${matchId}`;
  const ref = doc(db, "predictions", predictionId);

  await setDoc(
    ref,
    {
      uid,
      matchId,
      predHomeScore,
      predAwayScore,
      pointsAwarded: null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getPredictionsByUser(uid: string): Promise<Prediction[]> {
  const q = query(collection(db, "predictions"), where("uid", "==", uid));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Prediction, "id">),
  }));
}