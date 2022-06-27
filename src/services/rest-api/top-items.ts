import {AxiosResponse} from "axios";
import {TopItem} from "../../models/models";
import {axiosJsonIns} from "../../helpers/axios-instances";

export default class TopItemsEndpoints {
  static top(take: number = 3, skip: number = 0): Promise<AxiosResponse<TopItem[]>> {
    return axiosJsonIns.get(`/api/top-items?take=${take}&skip=${skip}`)
  }
}
