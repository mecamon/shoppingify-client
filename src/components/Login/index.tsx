import { useAuth } from "../../providers/AuthProvider"
import LoginForm from "./LoginForm/LoginForm"
import AccountEndpoints from "../../services/rest-api/account"
import { LoginInfo } from "../../models/models"
import React from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "./RegisterForm/RegisterForm"
import { validEmail, validLengthField, validPassword } from "../../helpers/validators"


export default function LoginPage() {
  const { isAuthenticated, authenticated } = useAuth()
  const navigate = useNavigate()
  const [authenticatingState, setAuthenticatingState] = React.useState<AuthenticatingState>({isLoading: false, err: null})
  const [isRegisterMode, setIsRegisterMode] = React.useState<boolean>(false)
  const [loginInfoState, setLoginInfoState] = React.useState<LoginInfo>({email: '', password: ''})
  const [registerInfoState, setRegisterInfoState] = React.useState<RegisterInfo>({
    email: '',
    emailIsValid: null!,
    password: '',
    passwordIsValid: null!,
    name: '',
    nameIsValid: null!,
    lastname: '',
    lastnameIsValid: null!,
  })

  React.useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  function toggleAuthMode() {
    setIsRegisterMode(prev => !prev)
  }

  function updateRegisterInfo(registerInfo: RegisterInfo) {
    setRegisterInfoState(registerInfo)
  }

  async function registerNewUser() {
    setAuthenticatingState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.register({
        email: registerInfoState.email,
        password: registerInfoState.password,
        name: registerInfoState.name,
        lastname: registerInfoState.lastname,
      })
      localStorage.setItem('token', res.data.token)
    } catch (e: any) {
      setAuthenticatingState(state => ({...state, err: e?.response.data}))
    } finally {
      setAuthenticatingState(state => ({...state, isLoading: false}))
    }
  }

  async function regularLogin(loginInfo: LoginInfo) {
    setAuthenticatingState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.login(loginInfo)
      localStorage.setItem('token', res.data.token)
      authenticated()
    }catch (e: any) {
      setAuthenticatingState(state => ({...state, err: e?.response.data}))
    } finally {
      setAuthenticatingState(state => ({...state, isLoading: false}))
    }
  }

  async function visitorLogin() {
    setAuthenticatingState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.visitor()
      localStorage.setItem('token', res.data.token)
      authenticated()
    }catch (e: any) {
      setAuthenticatingState(state => ({...state, err: e?.response.data}))
    } finally {
      setAuthenticatingState(state => ({...state, isLoading: false}))
    }
  }

  function updateLoginInfo(loginInfo: LoginInfo): void {
    setLoginInfoState(loginInfo)
  }

  return (
    <div className=" bg-main-bg h-screen">
      <main className=" flex flex-col justify-center h-full">
        {isRegisterMode ? 
          <RegisterForm 
            registerInfo={registerInfoState} 
            updateFields={updateRegisterInfo} 
            registerNewUser={registerNewUser} 
            toggleAuthMode={toggleAuthMode}
          />
          :
          <LoginForm
          loginInfo={loginInfoState}
            updateLoginInfo={updateLoginInfo}
            regularLogin={regularLogin}
            visitorLogin={visitorLogin}
            toggleAuthMode={toggleAuthMode}
          />
        }
      </main>
    </div>
  )
}

interface AuthenticatingState {
  isLoading: boolean
  err: any
}

export interface RegisterInfo {
  email: string
  emailIsValid: boolean
  password: string
  passwordIsValid: boolean
  name: string
  nameIsValid: boolean
  lastname: string
  lastnameIsValid: boolean
}