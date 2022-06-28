import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "./AuthProvider";

export default function RequiresAuth({children}: {children: JSX.Element}) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }
  return children
}