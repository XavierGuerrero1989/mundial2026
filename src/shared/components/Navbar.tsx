import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuth } from "../../modules/auth/hooks/useAuth";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
  color: isActive ? "#111827" : "#4b5563",
  padding: "8px 10px",
  borderRadius: 8,
  background: isActive ? "#e5e7eb" : "transparent",
});

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ fontWeight: 800 }}>Mundial 2026 ⚽</div>

        <nav style={{ display: "flex", gap: 8 }}>
          <NavLink to="/" style={linkStyle} end>
            Inicio
          </NavLink>
          <NavLink to="/live" style={linkStyle}>
            Live
          </NavLink>
          <NavLink to="/predictions" style={linkStyle}>
            Pronósticos
          </NavLink>
          <NavLink to="/leaderboard" style={linkStyle}>
            Ranking
          </NavLink>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            {user?.displayName || user?.email}
          </span>
          <button onClick={handleLogout}>Salir</button>
        </div>
      </div>
    </header>
  );
}