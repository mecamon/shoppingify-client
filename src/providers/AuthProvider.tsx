import { AxiosResponse } from "axios"
import React, { useState } from "react"
import AccountEndpoints from "../services/rest-api/account"
import {AuthInfo, SuccessLogged} from "../models/models";


export default function AuthProvider({children}: {children: React.ReactNode}) {
  const initialState = {isAuthenticated: false, isLoading: false, err: null}
  const [ state, setState ] = useState<AuthState>(initialState)

  function errorHandling(e: any) {
    const error = e.response?.data
    setState(state => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      err: error,
    }))
  }

  function authenticateHandling(loggedData: SuccessLogged) {
    const { token } = loggedData
    localStorage.setItem('token', token)
    setState(state => ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
    }))
  }

  async function visitorLogin() {
    setState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.visitor()
      authenticateHandling(res.data)
    } catch(e: any) {
      errorHandling(e)
    }
  }

  async function regularLogin(authInfo: AuthInfo) {
    setState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.register(authInfo)
      authenticateHandling(res.data)
    } catch (e: any) {
      errorHandling(e)
    }
  }

  function logout() {
    setState(initialState)
  }

  const dispatch: AuthDispatcher = { visitorLogin, regularLogin, logout }
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
  regularLogin: (authInfo: AuthInfo) => Promise<void>
  visitorLogin: () => Promise<void>
  logout: () => void
}
