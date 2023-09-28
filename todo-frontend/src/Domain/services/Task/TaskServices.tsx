/* eslint-disable @typescript-eslint/no-unused-vars */
import {AxiosResponse} from 'axios';
import instance from '../../Settings/api';
import { format } from 'date-fns';

export namespace TaskService {
  export const fetchTask = (page: number = 1, limit: number = 16 ,search: string  = ''): Promise<AxiosResponse<any>> => {
    let url = `task/list?page=${page}&limit=${limit}`;
    return instance.get(url);
  };

  export const createTask = (name: string, description: string ,expirationDate: any , userId: string ): Promise<AxiosResponse<any>> => {
    let url = `task/create`;
    let body = { name, description, expirationDate:  format(new Date(expirationDate), 'yyyy-MM-dd HH:mm:ss.SSS'), userId }
    return instance.post(url, body);
  };

  export const deleteTask = (taskId: string ): Promise<AxiosResponse<any>> => {
    let url = `task/${taskId}`;
    return instance.delete(url);
  };

  export const updateTask = (taskId: string, name: string, description: string ,expirationDate: any , userId: string, status: string,statusProcess : string   ): Promise<AxiosResponse<any>> => {
    let url = `task/update?taskId=${taskId}`;
    let body = { name, description, expirationDate:  format(new Date(expirationDate), 'yyyy-MM-dd HH:mm:ss.SSS'), status , statusProcess,userId }
    return instance.put(url, body);
  };
}
