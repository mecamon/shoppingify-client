import { useTranslation } from "react-i18next"
import Logo from "../../../assets/logo.svg"
import { LoginInfo } from "../../../models/models"
import React from "react"

export default function LoginForm({
  isLoading,
  loginInfo, 
  updateLoginInfo, 
  showConfirmationAsVisitor, 
  regularLogin, 
  toggleAuthMode}: Props) {
  const { t } = useTranslation()

  async function login(e: any, loginInfo: LoginInfo) {
    e.preventDefault()
    await regularLogin(loginInfo)
  }


  return (
    <div className="auth-form-container">
      <img
        src={Logo}
        alt="site-logo"
        className=" w-8 h-auto absolute right-6 top-6"
      />
      <form className="auth-form" onSubmit={ async (e) => login(e, loginInfo)}>
        <span className=" text-labels text-xl text-center">{t("title")}</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginInfo.email}
          onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}
          className="auth-form-input"
          id="email"
          data-testid="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}
          className="auth-form-input"
          id="password"
          data-testid="password"
        />
        {
          !isLoading ? 
            <input
              type="submit"
              className=" bg-accent-2 text-white rounded-xl py-1 cursor-pointer"
              value={t("login")}
              data-testid="submit"
            /> :
            <button disabled className="bg-accent-2 text-white rounded-xl py-1 cursor-pointer">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </button>
        }
        <button
          type="button"
          onClick={() => showConfirmationAsVisitor()}
          className="text-accent-3"
          data-testid="visitor-login"
          >
          {t("visitor")}
        </button>
        <button 
          type="button"
          onClick={() => toggleAuthMode()}
          className="text-accent-3 cursor-pointer text-sm" 
          data-testid="toggle-auth-mode"
          >{t("switchToRegisterForm")}</button>
      </form>
    </div>
  );
}

interface Props {
  isLoading: boolean
  loginInfo: LoginInfo
  updateLoginInfo: (loginInfo: LoginInfo) => void
  toggleAuthMode: () => void
  showConfirmationAsVisitor: () => void
  regularLogin: (loginInfo: LoginInfo) => Promise<void>
}
