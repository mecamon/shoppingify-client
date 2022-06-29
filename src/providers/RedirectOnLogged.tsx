import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export default function RedirectOnLogged({children}: {children: JSX.Element}) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/items')
    } 
  })
  return children
}