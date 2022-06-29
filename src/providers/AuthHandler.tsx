import React from "react";
import { useAuth } from "./AuthProvider";

export default function AuthHandler({children}: {children: JSX.Element}) {
  const { authenticated, logout } = useAuth()
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      authenticated()
    } else {
      logout()
    }
  })
  return children
}