import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ padding: 24 }}>Cargando sesión...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}