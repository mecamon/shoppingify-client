import { useTranslation } from "react-i18next"
import styles from "./LoginForm.module.css"
import Logo from "../../../assets/logo.svg"
import React, { useEffect } from "react"
import { AuthState } from "../../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function LoginForm({anonymousLogin, state}: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if(state.isAuthenticated) {
      navigate('/')
    }
  }, [state])

  return (
    <div className="mx-auto shadow-lg relative bg-menu-bg w-4/5 md:w-3/5 lg:w-2/5 2xl:w-1/5 h-2/5 rounded-xl">
      <img
        src={Logo}
        alt="site-logo"
        className=" w-8 h-auto absolute right-6 top-6"
      />
      <form className={styles.form}>
        <span className=" text-labels text-xl text-center">{t("title")}</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" h-10 rounded-xl outline-accent-2 border-border-common border-2"
          id="email"
          data-testid="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className=" h-10 rounded-xl outline-accent-2 border-border-common border-2"
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
          onClick={async() => anonymousLogin()}
          className="text-accent-3"
          data-testid="anonymous-login"
          >
          {t("visitor")}
        </button>
      </form>
    </div>
  );
}

interface Props {
  anonymousLogin: () => Promise<void>
  state: AuthState
}
