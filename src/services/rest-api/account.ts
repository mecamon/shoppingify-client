import {AuthInfo, LoginInfo, SuccessLogged} from "../../models/models";
import {axiosJsonIns} from "../../helpers/axios-instances";
import {AxiosResponse} from "axios";


export default class AccountEndpoints {
  static register(authInfo: AuthInfo): Promise<AxiosResponse<SuccessLogged>> {
    return axiosJsonIns.post('/api/auth/register', authInfo)
  }

  static login(loginInfo: LoginInfo): Promise<AxiosResponse<SuccessLogged>> {
    return axiosJsonIns.post('/api/auth/login', loginInfo)
  }

  static visitor(): Promise<AxiosResponse<SuccessLogged>> {
    return axiosJsonIns.post('/api/auth/visitor-register', {})
  }
}
