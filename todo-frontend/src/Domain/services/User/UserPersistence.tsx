import GlobalVariable from '../../Settings/GlobalVariable';

export namespace UserPersistService {
    const tokenKey: string = GlobalVariable.storageKeys.USER_TOKEN;

    export const getPersistedUser = () => {
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

      export const setPersistedUser = (user: any) => {
        try {
          // Convierte el objeto de usuario a JSON antes de almacenarlo
          localStorage.setItem(tokenKey, JSON.stringify(user));
        } catch (error) {
          console.error('Error al almacenar el usuario persistido:', error);
        }
      };
      

      export const removePersistedUser = () => {
        try {
          localStorage.removeItem(tokenKey);
        } catch (error) {
          console.error('Error al eliminar el usuario persistido:', error);
        }
      };
}
