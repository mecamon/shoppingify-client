import { AxiosResponse } from "axios";
import { axiosJsonIns } from "../../helpers/axios-instances";
import { ItemsSummaryByMonth, ItemSummaryByYear } from "../../models/models";

export default class ItemsSummaryEndpoints {
  static getByMonth(year: number): Promise<AxiosResponse<ItemsSummaryByMonth>> {
    return axiosJsonIns.get(`/api/summary/${year}`)
  }

  static getByYear(): Promise<AxiosResponse<ItemSummaryByYear[]>> {
    return axiosJsonIns.get('/api/summary')
  }
}