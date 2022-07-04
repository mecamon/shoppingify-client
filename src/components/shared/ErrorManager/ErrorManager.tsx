import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../providers/AuthProvider"
import DisplayErrors from "../DisplayErrors/DisplayErrors"

export default function ErrorManager({error}: Props) {
  const { setAuthState, authenticated } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  React.useEffect(() => {
    if (error?.response.status === 401) {
      setAuthState(false)
      navigate('/')
    }
  }, [authenticated])

  if (error?.response.status === 401) {
    return (<DisplayErrors errs={t("loginPromt")} />)
  }
  else {
    return (<DisplayErrors errs={error?.response.data} />)
  }
}

interface Props {
  error: any
}