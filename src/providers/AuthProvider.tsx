import React, { SetStateAction, useContext, useMemo, useState } from "react"

export default function AuthProvider({children}: {children: React.ReactElement}) {
  const [ authState, setAuthState ] = useState<boolean>(true)

  function logout() {
    setAuthState(false)
  }

  function authenticated() {
    setAuthState(true)
  }

  const contextValue = useMemo(() => ({
    isAuthenticated: authState,
    logout,
    authenticated,
    setAuthState,
  }), [authState])

  return (
    <AuthContext.Provider value={ contextValue }>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('auth context needs to be initialized before using it')
  }
  return context
}

export const AuthContext = React.createContext<AuthContextType>(null!)

export interface AuthContextType {
  isAuthenticated: boolean
  logout: () => void
  authenticated: () => void
  setAuthState: React.Dispatch<SetStateAction<boolean>>
}
