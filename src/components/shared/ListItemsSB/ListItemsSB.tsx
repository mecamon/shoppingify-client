import React from "react"
import { useTranslation } from "react-i18next"
import { List } from "../../../models/models"

export default function ListItemsSB({addItem, list}: Props) {
  const { t } = useTranslation()
  return (
    <>
      <span>{ t("sbItemMessage") }</span>
      <button data-testid="add-item" onClick={() => addItem()}>{ t("addItem") }</button>
      <span data-testid="no-items">{ t("noItems") }</span>
    </>
  )
}

interface Props {
  addItem: () => void
  list: List
}