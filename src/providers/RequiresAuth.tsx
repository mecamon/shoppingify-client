import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "./AuthProvider";

export default function RequiresAuth({children}: {children: JSX.Element}) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return (
      <Navigate to="/" replace={true} />
    )
  }
  return children
}