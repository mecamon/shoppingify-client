import { axiosJsonIns } from "../helpers/axios-instances";

export default class Api {
  static anonymousAuth(): Promise<any> {
    return axiosJsonIns.get('/auth')
  }
}