import React, {
    createContext,
    Dispatch,
    useContext,
    useMemo,
    useReducer,
  } from 'react';

  import {
    AppActions,
    AppContextState,
  } from '../type';
import { TaskService } from '../services/Task/TaskServices';
  
  const initialState: AppContextState = {
    DataCollection: [],
    TotalRow: 0
  };
  
  const AppContext = createContext<[AppContextState, Dispatch<AppActions>]>([
    initialState,
    () => {},
  ]);
  
  const reducer = (
    state: AppContextState,
    action: AppActions,
  ): AppContextState => {
    switch (action.type) {
      case 'LOAD_DATA':
        return {
          ...state,
          DataCollection: action.payload.list
        };
  
      default:
        return state;
    }
  };
  
  export const AppProvider: React.FC = ({children}: any) => {
    const value = useReducer(reducer, initialState);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
  
  export const useAppContext = (): {
    state: AppContextState;
    actions: {
      updateDataCollection: (page: number, limit: number ,search: string) => void;
      createTask: (name: string, description: string ,expirationDate: any , userId: string) => any
      deleteTask: (taskId: string) => boolean
      updateTask: (taskId: any) => boolean
    };
    selectors: {};
  } => {
    const [state, dispatch] = useContext(AppContext);
  
    const actions = useMemo(
      () => ({
        updateDataCollection: async (page: number = 1, limit: number = 10 ,search: string = '') => {
          const request = await TaskService.fetchTask(page, limit, search);
          dispatch({type: 'LOAD_DATA', payload: {list: request.data.data, total: request.data.totalrow }});
        },
        createTask: async (name: string, description: string ,expirationDate: any , userId: string) => {
          const request = await TaskService.createTask(name, description, expirationDate, userId);
          return request.data.Success as boolean
        },
        deleteTask: async (taskId: string) => {
            const request = await TaskService.deleteTask(taskId);
            return request.data.Success as boolean
          },

          updateTask: async (task: any) => {
            const { _id, name, description, expirationDate, status, statusProcess, userId} = task
            const request = await TaskService.updateTask(_id, name, description, expirationDate, userId, status, statusProcess  );
            return request.data.Success as boolean
          } 

      }),
      [dispatch],
    );
  
    const selectors = useMemo(
      () => ({
         
      }),
      [],
    );
    return {state, actions, selectors};
  };
  