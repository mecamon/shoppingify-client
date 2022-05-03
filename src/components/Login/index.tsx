import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import LoginForm from "./LoginForm/LoginForm"
export default function LoginPage() {

  const { state, dispatch } = useContext(AuthContext)

  return (
    <div className=" bg-main-bg h-screen">
      <main className=" flex flex-col justify-center h-full">
        <LoginForm 
          anonymousLogin={dispatch.anonymousLogin} 
          state={state}
        />
      </main>
    </div>
  )
} 