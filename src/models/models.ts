export interface AuthInfo {
  email: string
  lastname: string
  name: string
  password: string
}

export interface LoginInfo {
  email: string
  password: string
}

export interface SuccessLogged {
  token: string
}

export interface Category {
  id?: number
  name: string
}

export interface Created {
  inserted_id: number
}

export interface Item {
  category_id: number
  id: number
  name: string
}

export interface ItemDetailed {
  id: number
  name: string
  note: string
  image_url: string
  category_id: number
  category_name: string
}

export interface GroupOfItemsByCat {
  category_id: number
  category_name: string
  items: Item[]
}

export interface CreateItem {
  category_id: number
  file: File
  id?: number
  name: string
  note: string
}

export interface List {
  name: string
  date: string
  id: number
  is_cancelled: boolean
  is_completed: boolean
  items: ListItem[]
}

export interface ListItem {
  id: number
  item_id: number
  name: string
  quantity: number
  category_id: number
  category_name: string
  is_completed: boolean
}

export interface ItemToAddToList {
  item_id: number
  list_id: number
  quantity: number
}

export interface ListToCreateOrUpdate {
  name: string
}

export interface OldList {
  id: number
  date: string
  is_cancelled: boolean
  is_completed: boolean
  name: string
}

export interface SelectedItemInfo {
  item_sel_id: number
}

export interface ItemToUpdateInList {
  item_id: number
  quantity: number
}

export interface TopCategory {
  id: number
  category_id: number
  name: string
  percentage: number
  sum_quantity: number
}

export interface TopItem {
  id: number
  item_id: number
  name: string
  percentage: number
  sum_quantity: number
}
