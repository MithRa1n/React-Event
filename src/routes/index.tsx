import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard  from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Register from "../pages/Register";   
import Calendar from "@/pages/Calendar";
import EventsList from "@/pages/EventsList";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: (<Register />),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <EventsList />
      </ProtectedRoute>
    ),
  },
  
];
export default routes;