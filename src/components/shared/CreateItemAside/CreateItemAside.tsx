import { useTranslation } from "react-i18next";
import { useList } from "../../../providers/ListProvider";
import AddItemSB from "../AddItemSB/AddItemSB";
import SBBottomBarButton from "../SBBottomBarButton/SBBottomBarButton";

export default function CreateItemAside() {
  const { t } = useTranslation()
  const { setAsideMode } = useList()

  function saveNewItem() {
    console.log('saving new item...')
  }

  return (
    <aside className="relative bg h-full w-1/4">
      <AddItemSB/>
      <div className="absolute flex justify-center items-center z-10 bottom-0 w-full p-11 bg-main-bg">
        <div className="mx-2">
          <SBBottomBarButton buttonLabel={t("cancel")} bgClassColor="bg-transparent" onClick={() => setAsideMode('List')} />
        </div>
        <div className="mx-2">
          <SBBottomBarButton buttonLabel={t("saveButtonLabel")} bgClassColor="bg-accent-2" textClassColor="text-white" onClick={saveNewItem} />
        </div>
      </div>
    </aside>
  )
}