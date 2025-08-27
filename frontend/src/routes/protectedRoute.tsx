import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import type React from "react";
import { AuthContext } from "../context/authContext";
import Loader from "../components/shared/loader";

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: {
  children: React.ReactNode;
  requireAuth?: boolean;
}) {
  const { auth, loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (loading) {
    return  <Loader className="h-[50vh]"/>
  }

  if (requireAuth && !auth?.user) {
    return <Navigate to="/auth/login" replace />;
  } else if (
    (auth?.user && !requireAuth) ||
    (requireAuth && auth?.user && pathname === "/")
  ) {
    return <Navigate to="/users" replace />;
  }

  return children;
}
