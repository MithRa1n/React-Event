import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "@/hooks/useAuth";

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
