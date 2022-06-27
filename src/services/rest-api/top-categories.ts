import {AxiosResponse} from "axios";
import {TopCategory} from "../../models/models";
import {axiosJsonIns} from "../../helpers/axios-instances";

export default class TopCategoriesEndpoints {
  static top(take: number = 3, skip: number = 0): Promise<AxiosResponse<TopCategory[]>> {
    return axiosJsonIns.get(`/api/top-categories?take=${take}&skip=${skip}`)
  }
}
