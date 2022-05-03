import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function RequiresAuth({children}: {children: JSX.Element}) {
  const auth = useContext(AuthContext)
  if (!auth.state.isAuthenticated) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }
  return children
}