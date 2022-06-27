import {AxiosResponse} from "axios";
import {GroupOfItemsByCat, Created, CreateItem, Item} from "../../models/models";
import {axiosJsonIns, axiosMultiPartIns} from "../../helpers/axios-instances";

export default class ItemsEndpoints {
  static itemsByCategoryGroup(take: number = 4, skip: number = 0): Promise<AxiosResponse<GroupOfItemsByCat[]>> {
    return axiosJsonIns.get(`/api/items?take=${take}&skip=${skip}`)
  }

  static create(fd: FormData): Promise<AxiosResponse<Created>> {
    return axiosMultiPartIns.post('/api/items', fd)
  }

  static getById(id: number): Promise<AxiosResponse<Item>> {
    return axiosJsonIns.get(`/api/items/${id}`)
  }
}
