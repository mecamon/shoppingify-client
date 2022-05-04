import { AxiosResponse } from "axios"
import React, { useState } from "react"
import Api from "../data-source/api"


export default function AuthProvider({children}: {children: React.ReactNode}) {

  const initialState = {isAuthenticated: true, isLoading: false, err: null}
  const [ state, setState ] = useState(initialState)

  async function anonymousLogin() {
    setState({...state, isLoading: true})
    try {
      const res: AxiosResponse = await Api.anonymousAuth()
      const { token } = res.data
      localStorage.setItem('token', token)
      setTimeout(() => {
        setState({...state, isLoading: false, isAuthenticated: true})
      }, 5000)
    }catch(e: any) {
      const error = e.response?.data
      setState({...state, isLoading: false, isAuthenticated: false, err: error})
    }
  }

  function logout() {
    setState(initialState)
  }

  const dispatch: AuthDispatcher = { anonymousLogin, logout }
  const initialContext: AuthContextType = {state, dispatch}

  return (
    <AuthContext.Provider value={ initialContext }>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContext = React.createContext<AuthContextType>(null!)

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  err: any
}
export interface AuthContextType {
  state: AuthState
  dispatch: AuthDispatcher
}
interface AuthDispatcher {
  anonymousLogin: () => Promise<void>
  logout: () => void
}
