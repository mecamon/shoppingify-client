import {AxiosResponse} from "axios";
import {GroupOfItemsByCat, Created, CreateItem, Item, ItemDetailed} from "../../models/models";
import {axiosJsonIns, axiosMultiPartIns} from "../../helpers/axios-instances";

export default class ItemsEndpoints {
  static itemsByCategoryGroup(q: string = '', take: number = 6, skip: number = 0): Promise<AxiosResponse<GroupOfItemsByCat[]>> {
    return axiosJsonIns.get(`/api/items?take=${take}&skip=${skip}&q=${q}`)
  }

  static create(fd: FormData): Promise<AxiosResponse<Created>> {
    return axiosMultiPartIns.post('/api/items', fd)
  }

  static getById(id: number): Promise<AxiosResponse<ItemDetailed>> {
    return axiosJsonIns.get(`/api/items/${id}`)
  }

  static deleteById(id: number): Promise<AxiosResponse<any>> {
    return axiosJsonIns.delete(`/api/items/${id}`)
  }
}
