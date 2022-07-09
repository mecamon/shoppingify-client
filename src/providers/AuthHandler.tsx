import React from "react"
import { useAuth } from "./AuthProvider"
import eventBus from "../services/event-bus/event-bus"

export default function AuthHandler({children}: {children: JSX.Element}) {
  const { authenticated, logout, setAuthState } = useAuth()

  function confirmLogout() {
    localStorage.removeItem('token')
    setAuthState(false)
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      authenticated()
    } else {
      logout()
    }
    eventBus.on('confirmLogout', confirmLogout)
    return () => {
      eventBus.remove('confirmLogout', confirmLogout)
    }
  })
  return children
}