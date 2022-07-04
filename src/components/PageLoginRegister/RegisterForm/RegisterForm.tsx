import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { RegisterInfo } from ".."
import Logo from "../../../assets/logo.svg"

export default function RegisterForm({
  isLoading,
  registerInfo, 
  updateFields, 
  registerNewUser, 
  toggleAuthMode
}: Props) {
  const { t } = useTranslation()
  async function register(e: React.FormEvent) {
    e.preventDefault()
    await registerNewUser()
  }
  let isValidForm = useMemo(() => {
    return registerInfo.email.length !== 0 &&
        registerInfo.password.length !== 0 && 
        registerInfo.retypePassword.length !== 0 && 
        registerInfo.name.length !== 0 &&
        registerInfo.lastname.length !== 0
  }, [registerInfo])

  return (
    <div className="auth-form-container">
      <img
        src={Logo}
        alt="site-logo"
        className=" w-8 h-auto absolute right-6 top-6"
      />
      <form className="auth-form" onSubmit={async(e) => register(e)} data-testid="register-form">
      <span className=" text-labels text-xl text-center">{t("title")}</span>
        <input 
          type="email" 
          name="email" 
          data-testid="email"
          placeholder={t("emailLabel")}
          value={registerInfo.email} 
          onChange={(e) => updateFields({...registerInfo, email: e.target.value})}
          className="auth-form-input"
           />
        <input 
          type="password" 
          name="password" 
          data-testid="password"
          placeholder={t("passwordLabel")}
          value={registerInfo.password}
          onChange={(e) => updateFields({...registerInfo, password: e.target.value})} 
          className="auth-form-input"
          />
        <input 
          type="password" 
          name="retype-password" 
          data-testid="retype-password"
          placeholder={t("retypePasswordLabel")}
          value={registerInfo.retypePassword}
          onChange={(e) => updateFields({...registerInfo, retypePassword: e.target.value})} 
          className="auth-form-input"
          />
        <input 
          type="text" 
          name="name" 
          data-testid="name"
          placeholder={t("nameLabel")}
          value={registerInfo.name}
          onChange={(e) => updateFields({...registerInfo, name: e.target.value})} 
          className="auth-form-input"
          />
        <input 
          type="text" 
          name="lastname" 
          data-testid="lastname"
          placeholder={t("lastnameLabel")}
          value={registerInfo.lastname}
          onChange={(e) => updateFields({...registerInfo, lastname: e.target.value})} 
          className="auth-form-input"
          />
        {
          !isLoading ?
          <input 
            type="submit" 
            value={t("register")} 
            className=" bg-accent-2 text-white rounded-xl py-1 cursor-pointer"
            disabled={!isValidForm} 
            data-testid="submit" 
          /> :
          <button disabled className="bg-accent-2 text-white rounded-xl py-1 cursor-pointer">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </button>
        }
        <button 
          onClick={() => toggleAuthMode()}
          className="text-accent-3 cursor-pointer mb-4 text-xs" 
          data-testid="toggle-auth-mode"
          >{t("switchToLoginForm")}</button>
      </form>
    </div>
  )
}

interface Props {
  isLoading: boolean
  registerInfo: RegisterInfo
  updateFields: (registerInfo: RegisterInfo) => void
  toggleAuthMode: () => void
  registerNewUser: () => Promise<void>
}
