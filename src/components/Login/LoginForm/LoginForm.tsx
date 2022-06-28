import { useTranslation } from "react-i18next"
import Logo from "../../../assets/logo.svg"
import { LoginInfo } from "../../../models/models"
import React from "react"

export default function LoginForm({loginInfo, updateLoginInfo, visitorLogin, regularLogin, toggleAuthMode}: Props) {
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
        <input
          type="submit"
          className=" bg-accent-2 text-white rounded-xl py-1 cursor-pointer"
          value={t("login")}
          data-testid="submit"
        />
        <button
          type="button"
          onClick={async() => visitorLogin()}
          className="text-accent-3"
          data-testid="visitor-login"
          >
          {t("visitor")}
        </button>
        <button 
          onClick={() => toggleAuthMode()}
          className="text-accent-3 cursor-pointer text-xs" 
          data-testid="toggle-auth-mode"
          >{t("switchToRegisterForm")}</button>
      </form>
    </div>
  );
}

interface Props {
  loginInfo: LoginInfo
  updateLoginInfo: (loginInfo: LoginInfo) => void
  toggleAuthMode: () => void
  visitorLogin: () => Promise<void>
  regularLogin: (loginInfo: LoginInfo) => Promise<void>
}
