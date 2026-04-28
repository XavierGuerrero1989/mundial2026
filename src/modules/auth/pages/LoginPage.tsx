import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [loading, user, navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Ingresar</h1>
      <p>Iniciá sesión para hacer tus pronósticos del Mundial 2026.</p>
      <button onClick={handleGoogleLogin}>Continuar con Google</button>
    </main>
  );
}