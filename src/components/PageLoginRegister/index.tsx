import { useAuth } from "../../providers/AuthProvider"
import LoginForm from "./LoginForm/LoginForm"
import AccountEndpoints from "../../services/rest-api/account"
import { LoginInfo } from "../../models/models"
import React from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "./RegisterForm/RegisterForm"
import ConfirmationModal from "../shared/ConfirmationModal/ConfirmationModal"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import DisplayErrors from "../shared/DisplayErrors/DisplayErrors"
import { useErrorHandler } from "../../hooks/useErrorHandler"


export default function LoginPage() {
  const { authenticated } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { httpError } = useErrorHandler()

  const [authenticatingState, setAuthenticatingState] = React.useState<AuthenticatingState>({isLoading: false, err: null})
  const [isRegisterMode, setIsRegisterMode] = React.useState<boolean>(false)
  const [loginInfoState, setLoginInfoState] = React.useState<LoginInfo>({email: '', password: ''})
  const [registerInfoState, setRegisterInfoState] = React.useState<RegisterInfo>({
    email: '',
    password: '',
    retypePassword: '',
    name: '',
    lastname: '',
  })
  const [iShowingConfirmationModal, setIShowingConfirmationModal] = React.useState<boolean>(false)

  function toggleAuthMode() {
    setIsRegisterMode(prev => !prev)
  }

  function updateRegisterInfo(registerInfo: RegisterInfo) {
    setRegisterInfoState(registerInfo)
  }

  async function registerNewUser() {
    if (!passwordsAreEqual()) {
      toast.error(<DisplayErrors errs={t("passwordsNotEqual")}/>, {
        position: toast.POSITION.BOTTOM_LEFT,
      })
      return 
    }
    setAuthenticatingState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.register({
        email: registerInfoState.email,
        password: registerInfoState.password,
        name: registerInfoState.name,
        lastname: registerInfoState.lastname,
      })
      localStorage.setItem('token', res.data.token)
      authenticated()
      navigate('/items')
    } catch (e: any) {
      setAuthenticatingState(state => ({...state, err: e?.response.data}))
      httpError(e)
    } finally {
      setAuthenticatingState(state => ({...state, isLoading: false}))
    }
  }

  function passwordsAreEqual(): boolean {
    if (registerInfoState.password !== registerInfoState.retypePassword) {
      return false
    }
    return true
  }

  async function regularLogin(loginInfo: LoginInfo) {
    setAuthenticatingState(state => ({...state, isLoading: true}))
    try {
      const res = await AccountEndpoints.login(loginInfo)
      localStorage.setItem('token', res.data.token)
      authenticated()
      navigate('/items')
    }catch (e: any) {
      setAuthenticatingState(state => ({...state, err: e?.response.data}))
      httpError(e)
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
      httpError(e)
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
        {
          iShowingConfirmationModal && 
          <ConfirmationModal>
            <span className=" text-accent-2 font-bold text-2xl">{t("warning")}</span>
            <span className=" text-center text-light-text w-2/3">{t("visitorWarningMessage")}</span>
            <div className="flex justify-center mt-2">
              <button 
                className="accent-btn"
                onClick={async () => visitorLogin()}
                >{t("yes")}</button>
              <button 
                className="accent-btn"
                onClick={() => setIShowingConfirmationModal(false)}
                >{t("no")}</button>
            </div>
          </ConfirmationModal>
        }
        {isRegisterMode ? 
          <RegisterForm 
            isLoading={authenticatingState.isLoading}
            registerInfo={registerInfoState} 
            updateFields={updateRegisterInfo} 
            registerNewUser={registerNewUser} 
            toggleAuthMode={toggleAuthMode}
          />
          :
          <LoginForm
            isLoading={authenticatingState.isLoading}
            loginInfo={loginInfoState}
            updateLoginInfo={updateLoginInfo}
            regularLogin={regularLogin}
            showConfirmationAsVisitor={() => setIShowingConfirmationModal(true)}
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
  password: string
  retypePassword: string
  name: string
  lastname: string
}