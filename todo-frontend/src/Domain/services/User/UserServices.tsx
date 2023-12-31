import {AxiosResponse} from 'axios';
import instance from '../../Settings/api';

export namespace UserService {
  export const PostLoginUser = async (
    user: string,
    password: string,
  ): Promise<AxiosResponse<any>> => {
    let url = 'user/token';
    let bodyRequest = {
      email: user,
      password: password,
    };

    return  instance.post<any>(url, bodyRequest)
  };
}
