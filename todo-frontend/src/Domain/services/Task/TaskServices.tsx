/* eslint-disable @typescript-eslint/no-unused-vars */
import {AxiosResponse} from 'axios';
import instance from '../../Settings/api';

export namespace TaskService {
  export const fetchTask = (): Promise<AxiosResponse<any>> => {
    let url = 'task/list';
    return instance.get(url);
  };

}
