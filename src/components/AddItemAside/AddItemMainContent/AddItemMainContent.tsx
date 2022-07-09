import React from "react"
import { useTranslation } from "react-i18next"
import { Category } from "../../../models/models"
import CategoriesEndpoints from "../../../services/rest-api/categories"
import CategoriesFound from "../CategoriesFound/CategoriesFound"
import { ItemFormValues } from ".."
import { useErrorHandler } from "../../../hooks/useErrorHandler"

export default function AddItemMainContent({formValues, setFormValues}: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isLoadingCategory, setIsLoadingCategory] = React.useState<boolean>(false)
  const [categoriesSuggested, setCategoriesSuggested] = React.useState<Category[]>([])

  const { t } = useTranslation()
  const { httpError } = useErrorHandler()
  
  function selectCategory(category: Category) {
    setFormValues(prev => ({
      ...prev, 
      category_id: category.id!, 
      category_name: category.name,
    }))
    setCategoriesSuggested([])
  }

  function clearCategory() {
    setFormValues(prev => ({
      ...prev, 
      category_name: '', 
      category_id: 0,
    }))
    setCategoriesSuggested([])
  }

  async function searchForRelatedCat(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({
      ...prev, 
      category_name: e.target.value,
    }))
    if (formValues.category_name.length >= 2) {
      await loadCategoryByName()  
    }
  }

  async function loadCategoryByName() {
    setIsLoadingCategory(true)
    try {
      const res = await CategoriesEndpoints.getByName(formValues.category_name)
      if (res.data) {
        setCategoriesSuggested(res.data)
      }
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoadingCategory(false)
    }
  }

  async function createCategory() {
    setIsLoadingCategory(true)
    try {
      const res = await CategoriesEndpoints.create({name: formValues.category_name})  
      setFormValues(prev => ({
        ...prev, 
        category_id: res.data.inserted_id,
      }))
      setCategoriesSuggested([])
    } catch(e: any) {
      httpError(e)
    } finally {
      setIsLoadingCategory(false)
    }
  }

  function setFileToFormValues(filelist: FileList) {
    setFormValues(prev => ({...prev, file: filelist[0]}))
  }

  return (
    <form className="flex flex-col bg-main-bg h-full px-11 pb-11 pt-8 pb-40 overflow-y-auto">
      <h2 className=" text-2xl mb-8">{t("addNewItem")}</h2>
      {/* NAME */}
      <div className="flex flex-col mb-4">
        <label className=" text-sm" htmlFor="name">{t("nameLabel")}</label> 
        <input 
          className="item-form-input" 
          required
          autoComplete="off"
          placeholder={t("itemNamePlaceholder")}
          type="text" 
          id="name" 
          value={formValues.name}
          onChange={(e) => setFormValues((prev) => ({...prev, name: e.target.value}))}
          /> 
      </div>
      {/* NOTE */}
      <div className="flex flex-col mb-4">
        <label className="text-sm" htmlFor="note">{t("itemNoteLabel")}</label> 
        <textarea
          className="item-form-textarea py-1" 
          autoComplete="off"
          placeholder={t("itemNotePlaceholder")}
          id="note"
          value={formValues.note}
          onChange={(e) => setFormValues((prev) => ({...prev, note: e.target.value}))}
        ></textarea>
      </div>
      {/* IMAGE */}
      <div className="flex flex-col mb-4">
        <label className=" text-sm" htmlFor="image">{t("itemImageLabel")}</label> 
        <div className="item-form-input bg-white flex items-center justify-between px-2">
          <input hidden type="file" ref={fileInputRef} onChange={(e) => setFileToFormValues(e.target.files!)} />
          <span className="text-disabled">{formValues.file?.name}</span>
          <button 
            className="text-sm border text-icons border-disabled p-2 rounded-lg"
            type="button"
            onClick={() => fileInputRef.current?.click() }
            >{t('itemImagePlaceholder')}
          </button>
        </div>
      </div>
      {/* CATEGORY */}
      <div className="flex flex-col mb-4">
        <label className="text-sm" htmlFor="category">{t("itemCategoryLabel")}</label> 
        <div className="w-full relative">
          <input 
            className="item-form-input w-full" 
            data-testid="category-name"
            autoComplete="off"
            placeholder={t("itemCategoryPlaceholder")}
            type="text" 
            id="category"
            value={formValues.category_name}
            disabled={formValues.category_id !== 0}
            onChange={(e) => searchForRelatedCat(e)}
             /> 
            <button 
              className="absolute right-3 top-3 text-disabled hover:text-icons cursor-pointer"
              data-testid="cross-button"
              disabled={isLoadingCategory}
              type="button"
              onClick={clearCategory}
              >
              <span className="material-icons text-3xl">close</span>
            </button>
          {
            (categoriesSuggested?.length !== 0 || (formValues.category_name !== '' && !formValues.category_id)) && 
            <CategoriesFound 
              categoryInputValue={formValues.category_name}
              selectCategory={selectCategory} 
              createCategory={createCategory} 
              categoriesSuggested={categoriesSuggested} />
          }
        </div>
      </div>
    </form>
  )
}

interface Props {
  formValues: ItemFormValues 
  setFormValues: React.Dispatch<React.SetStateAction<ItemFormValues>>
}