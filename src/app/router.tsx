import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../modules/auth/components/AuthGuard";
import LoginPage from "../modules/auth/pages/LoginPage";
import UpcomingMatchesPage from "../modules/matches/pages/UpcomingMatchesPage";
import LiveResultsPage from "../modules/matches/pages/LiveResultsPage";
import PredictionsPage from "../modules/predictions/pages/PredictionsPage";
import LeaderboardPage from "../modules/leaderboard/pages/LeaderboardPage";
import Layout from "../shared/components/Layout";

function PrivatePage({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivatePage>
        <UpcomingMatchesPage />
      </PrivatePage>
    ),
  },
  {
    path: "/live",
    element: (
      <PrivatePage>
        <LiveResultsPage />
      </PrivatePage>
    ),
  },
  {
    path: "/predictions",
    element: (
      <PrivatePage>
        <PredictionsPage />
      </PrivatePage>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <PrivatePage>
        <LeaderboardPage />
      </PrivatePage>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);