import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import type { Match } from "../../../shared/types/match";
import type { Prediction } from "../../../shared/types/prediction";
import { subscribeMatches } from "../../matches/services/matchesService";
import {
  getPredictionsByUser,
  savePrediction,
} from "../services/predictionsService";
import PredictionForm from "../components/PredictionForm";

export default function PredictionsPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeMatches(setMatches);
    return () => unsub();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!user?.uid) return;
      const rows = await getPredictionsByUser(user.uid);
      setPredictions(rows);
      setLoading(false);
    };
    run();
  }, [user?.uid]);

  const predictionMap = useMemo(() => {
    const map = new Map<string, Prediction>();
    for (const p of predictions) map.set(p.matchId, p);
    return map;
  }, [predictions]);

  const handleSave = async (matchId: string, home: number, away: number) => {
    if (!user?.uid) return;
    await savePrediction({
      uid: user.uid,
      matchId,
      predHomeScore: home,
      predAwayScore: away,
    });

    const refreshed = await getPredictionsByUser(user.uid);
    setPredictions(refreshed);
  };

  if (loading) return <p>Cargando pronósticos...</p>;

  return (
    <section>
      <h1>Pronósticos - Fase de grupos</h1>
      <p>3 puntos exacto, 1 punto resultado, 0 si no acierta.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {matches.map((match) => {
          const existing = predictionMap.get(match.id);
          const isLocked = new Date(match.lockAt.toDate()) <= new Date();

          return (
            <article
              key={match.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: 12,
                background: "#fff",
              }}
            >
              <small style={{ color: "#6b7280" }}>
                Grupo {match.group} ·{" "}
                {match.kickoffAt.toDate().toLocaleString("es-AR")}
              </small>

              <PredictionForm
                match={match}
                initialHome={existing?.predHomeScore}
                initialAway={existing?.predAwayScore}
                disabled={isLocked}
                onSave={(home, away) => handleSave(match.id, home, away)}
              />

              {isLocked && (
                <p style={{ color: "#b45309", marginTop: 8 }}>
                  Pronóstico bloqueado (el partido ya comenzó).
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}