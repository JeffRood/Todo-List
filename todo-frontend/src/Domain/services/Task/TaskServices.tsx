/* eslint-disable @typescript-eslint/no-unused-vars */
import {AxiosResponse} from 'axios';
import instance from '../../Settings/api';
import { format } from 'date-fns';

export namespace TaskService {
  export const fetchTask = (page: number = 1, limit: number = 10 ,search: string  = ''): Promise<AxiosResponse<any>> => {
    let url = `task/list?page=${page}&limit=${limit}`;
    return instance.get(url);
  };

  export const createTask = (name: string, description: string ,expirationDate: any , userId: string = '6513665835e5906f85b8b872'): Promise<AxiosResponse<any>> => {
    let url = `task/create`;
    let body = { name, description, expirationDate:  format(new Date(expirationDate), 'yyyy-MM-dd HH:mm:ss.SSS'), userId }
    return instance.post(url, body);
  };
}
