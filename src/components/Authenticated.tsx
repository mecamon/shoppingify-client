import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export default function Authenticated() {

  const { dispatch } = useContext(AuthContext)

  return (
    <>
      <h1>You are authenticated</h1>
      <button onClick={() => dispatch.logout()}>Logout</button>
    </>
  )
}