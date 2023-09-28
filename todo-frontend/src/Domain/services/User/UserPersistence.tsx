import GlobalVariable from '../../Settings/GlobalVariable';

export namespace TokenService {
    const tokenKey: string = GlobalVariable.storageKeys.USER_TOKEN;

    export const getPersistedToken = () => {
        try {
          const rawUser = localStorage.getItem(tokenKey);
          if (rawUser) {
            return JSON.parse(rawUser);
          }
          return null;
        } catch (error) {
          console.error('Error al obtener el usuario persistido:', error);
          return null;
        }
      };

      export const setPersistedToken = (user: any) => {
        try {
            debugger;
          localStorage.setItem(tokenKey, JSON.stringify(user));
          debugger;

        } catch (error) {
          console.error('Error al almacenar el usuario persistido:', error);
        }
      };
      

      export const removePersistedToken = () => {
        try {
          localStorage.removeItem(tokenKey);
        } catch (error) {
          console.error('Error al eliminar el usuario persistido:', error);
        }
      };
}
