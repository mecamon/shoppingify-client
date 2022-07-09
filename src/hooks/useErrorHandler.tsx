import React from "react"
import { useAuth } from "../providers/AuthProvider"
import { toast } from "react-toastify"
import DisplayErrors from "../components/shared/DisplayErrors/DisplayErrors"

export function useErrorHandler() {
  const { setAuthState } = useAuth()

  function httpError(error: any) {
    if (error?.response.status === 401) {
      localStorage.removeItem('token')
      setAuthState(false)
    } else {
      toast.error(<DisplayErrors errs={error?.response.data}/>, {
        position: toast.POSITION.BOTTOM_LEFT,
      })
    }
  }

  return {httpError}
}
