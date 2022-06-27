import {AxiosResponse} from "axios";
import {
  Created,
  ItemToAddToList, ItemToUpdateInList,
  List,
  ListToCreateOrUpdate,
  OldList, SelectedItemInfo
} from "../../models/models";
import {axiosJsonIns} from "../../helpers/axios-instances";

export default class ListsEndpoints {
  static getActive(): Promise<AxiosResponse<List>> {
    return axiosJsonIns.get('/api/lists/active')
  }

  static cancelActive(): Promise<AxiosResponse<any>> {
    return axiosJsonIns.delete('/api/lists/cancel-active')
  }

  static completeActive(): Promise<AxiosResponse<any>> {
    return axiosJsonIns.patch('/api/lists/complete-active')
  }

  static create(listToCreate: ListToCreateOrUpdate): Promise<AxiosResponse<Created>> {
    return axiosJsonIns.post('/api/lists/create', listToCreate)
  }

  static updateActiveName(listToCreate: ListToCreateOrUpdate): Promise<AxiosResponse<any>> {
    return axiosJsonIns.patch('/api/lists/name', listToCreate)
  }

  static addItemToActive(itemToAdd: ItemToAddToList): Promise<AxiosResponse<Created>> {
    return axiosJsonIns.post('/api/lists/add-item', itemToAdd)
  }

  static getOldLists(): Promise<AxiosResponse<OldList[]>> {
    return axiosJsonIns.get('/api/lists/old-lists')
  }

  static completeSelectedItem(selectedItem: SelectedItemInfo): Promise<AxiosResponse<any>> {
    return axiosJsonIns.put('/api/lists/selected-items', selectedItem)
  }

  // TODO: Modify this in the backend so it does not take a body to delete an item
  static deleteSelectedItem(itemID: number): Promise<AxiosResponse<any>> {
    return axiosJsonIns.delete(`/api/lists/selected-items/${itemID}`)
  }

  static updateItemInActiveList(itemToUpdate: ItemToUpdateInList): Promise<AxiosResponse<any>> {
    return axiosJsonIns.post('/api/lists/update-items', itemToUpdate)
  }

  static getListById(listId: number): Promise<AxiosResponse<List>> {
    return axiosJsonIns.get(`/api/lists/${listId}`)
  }
}
