import {AxiosResponse} from "axios";
import {axiosJsonIns} from "../../helpers/axios-instances";
import {Category, Created} from "../../models/models";

export default class CategoriesEndpoints {
  static getAll(take: number = 4, skip: number = 0): Promise<AxiosResponse<Category[]>> {
    return axiosJsonIns.get(`/api/categories?take=${take}&skip=${skip}`)
  }

  static getByName(q: string, take: number = 4, skip: number = 0): Promise<AxiosResponse<Category[]>> {
    return axiosJsonIns.get(`/api/categories/by-name?q=${q}&take=${take}&skip=${skip}`)
  }

  static create(category: Category): Promise<AxiosResponse<Created>> {
    return axiosJsonIns.post('/api/categories', category)
  }
}
