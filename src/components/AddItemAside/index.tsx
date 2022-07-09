import React from "react"
import { useTranslation } from "react-i18next"
import { useList } from "../../providers/ListProvider"
import ItemsEndpoints from "../../services/rest-api/items"
import AddItemMainContent from "./AddItemMainContent/AddItemMainContent"
import SBBottomBarButton from "./SBBottomBarButton/SBBottomBarButton"
import { useErrorHandler } from "../../hooks/useErrorHandler"
import { useItems } from "../../providers/ItemsProvider"

export default function CreateItemAside() {
  const { t } = useTranslation()
  const { setAsideMode } = useList()
  const { getItems } = useItems()
  const { httpError } = useErrorHandler()

  const [isLoadingItem, setIsLoadingItem] = React.useState<boolean>(false)
  const [formValues, setFormValues] = React.useState<ItemFormValues>({
    category_id: 0,
    category_name: '',
    file: null!,
    name: '',
    note: ''
  })

  const isSaveButtonDisabled = React.useMemo(() => {
    return !formValues.category_id 
            || formValues.category_name === '' 
            || formValues.name === ''
            || isLoadingItem
  }, [formValues, isLoadingItem])

  async function saveNewItem() {
    const fd = createFormData()
    setIsLoadingItem(true)
    try {
      const res = await ItemsEndpoints.create(fd)
      cleanUpItemForm()
      await getItems('')
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoadingItem(false)
    }
  }

  function createFormData(): FormData {
    const fd = new FormData()
    fd.append('name', formValues.name)
    fd.append('note', formValues.note)
    fd.append('file', formValues.file)
    fd.append('category_id', formValues.category_id.toString())
    return fd
  }

  function cleanUpItemForm() {
    setFormValues({
      category_id: 0,
      category_name: '',
      file: null!,
      name: '',
      note: ''
    })
  }

  return (
    <>
      <AddItemMainContent formValues={formValues} setFormValues={setFormValues} />
      <div className="absolute flex justify-center items-center z-10 bottom-0 w-full p-11 bg-main-bg">
        <div className="mx-2">
          <SBBottomBarButton 
            buttonLabel={t("cancel")} 
            bgClassColor="bg-transparent" 
            onClick={() => setAsideMode('List')} 
            />
        </div>
        <div className="mx-2">
          <SBBottomBarButton 
            isLoading={isLoadingItem}
            isDisabled={isSaveButtonDisabled}
            buttonLabel={t("saveButtonLabel")} 
            bgClassColor="bg-accent-2" 
            textClassColor="text-white" 
            onClick={saveNewItem} 
            />
        </div>
      </div>
    </>
  )
}

export interface ItemFormValues {
  category_id: number,
  category_name: string,
  file: File,
  name: string,
  note: string,
}