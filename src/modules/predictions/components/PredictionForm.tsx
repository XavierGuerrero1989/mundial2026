import { useState } from "react";
import type { Match } from "../../../shared/types/match";

type Props = {
  match: Match;
  initialHome?: number;
  initialAway?: number;
  disabled?: boolean;
  onSave: (home: number, away: number) => Promise<void>;
};

export default function PredictionForm({
  match,
  initialHome,
  initialAway,
  disabled = false,
  onSave,
}: Props) {
  const [home, setHome] = useState<number>(initialHome ?? 0);
  const [away, setAway] = useState<number>(initialAway ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (home < 0 || away < 0) return;

    try {
      setSaving(true);
      await onSave(home, away);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}
    >
      <strong style={{ minWidth: 180 }}>
        {match.homeTeam} vs {match.awayTeam}
      </strong>

      <input
        type="number"
        min={0}
        value={home}
        disabled={disabled || saving}
        onChange={(e) => setHome(Number(e.target.value))}
        style={{ width: 70 }}
      />
      <span>-</span>
      <input
        type="number"
        min={0}
        value={away}
        disabled={disabled || saving}
        onChange={(e) => setAway(Number(e.target.value))}
        style={{ width: 70 }}
      />

      <button type="submit" disabled={disabled || saving}>
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}