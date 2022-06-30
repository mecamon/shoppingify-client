import React from "react"
import { useTranslation } from "react-i18next"
import { Category } from "../../../models/models"
import CategoriesEndpoints from "../../../services/rest-api/categories"
import CategoriesFound from "../CategoriesFound/CategoriesFound"

export default function AddItemSB() {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [formValues, setFormValues] = React.useState<ItemFormValues>({
    category_id: 0,
    category_name: '',
    file: null!,
    name: '',
    note: ''
  })
  const { t } = useTranslation()
  const categories: Category[] = [
    {id: 1, name: 'Fruits'},
    {id: 2, name: 'Vegetables'},
  ]
  function selectCategory(category: Category) {

  }

  async function createCategory() {
    // CategoriesEndpoints.create()
  }

  function setFileToFormValues(filelist: FileList) {
    setFormValues(prev => ({...prev, file: filelist[0]}))
  }
  
  return (
    <form className="flex flex-col bg-main-bg h-full px-11 pb-11 pt-8" onSubmit={(e) => console.log(e)}>
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
          onChange={(e) => setFormValues((prev) => ({...prev, note: e.target.value}))}
        ></textarea>
      </div>
      {/* IMAGE */}
      <div className="flex flex-col mb-4">
        <label className=" text-sm" htmlFor="image">{t("itemImageLabel")}</label> 
        <div className="item-form-input bg-white flex items-center justify-end px-2">
          <input hidden type="file" ref={fileInputRef} onChange={(e) => setFileToFormValues(e.target.files!)} />
          <button 
            className="text-sm border text-icons border-disabled p-2 rounded-lg"
            type="button"
            onClick={() => fileInputRef.current?.click() }
            >{t('itemImagePlaceholder')}</button>
        </div>
      </div>
      {/* CATEGORY */}
      <div className="flex flex-col mb-4">
        <label className="text-sm" htmlFor="category">{t("itemCategoryLabel")}</label> 
        <div className="w-full relative">
          <input 
            className="item-form-input w-full" 
            autoComplete="off"
            placeholder={t("itemCategoryPlaceholder")}
            type="text" 
            id="category"
            value={formValues.category_name}
            onChange={(e) => setFormValues((prev) => ({...prev, category_name: e.target.value}))}
             /> 
          <span className="material-icons text-disabled hover:text-icons cursor-pointer text-3xl absolute right-3 top-3">close</span>
          <CategoriesFound 
            categoryInputValue={formValues.category_name}
            selectCategory={selectCategory} 
            createCategory={createCategory} 
            categoriesSuggested={categories} />
        </div>
      </div>
    </form>
  )
}

interface ItemFormValues {
  category_id: number,
  category_name: string,
  file: File,
  name: string,
  note: string,
}