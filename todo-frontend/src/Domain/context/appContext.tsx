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
  
  const initialState: AppContextState = {
    DataCollection: []
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
          DataCollection: action.payload,
          // CartShipping: []
        };
  
      default:
        return state;
    }
  };
  
  export const AppProvider: React.FC = ({children}) => {
    const value = useReducer(reducer, initialState);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
  
  export const useAppContext = (): {
    state: AppContextState;
    actions: {
      updateDataCollection: (DataList: any[]) => void;
    };
    selectors: {

    };
  } => {
    const [state, dispatch] = useContext(AppContext);
  
    const actions = useMemo(
      () => ({
        updateDataCollection: (DataList: Vendor[]) => {
          // console.log('emtre');
          dispatch({type: 'LOAD_DATA', payload: DataList});
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
  