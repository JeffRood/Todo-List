import GlobalVariable from '../../Settings/GlobalVariable';
import jwtDecode from 'jwt-decode';
import { User } from '../../type';


export namespace TokenService {
    const tokenKey: string = GlobalVariable.storageKeys.USER_TOKEN;

    export const getPersistedToken = (): {
      token: string;
      tokenValue: User;
  } | null => {
        try {
          const rawUser = localStorage.getItem(tokenKey);
          if (rawUser) {
            return {token: JSON.parse(rawUser), tokenValue: decodeToken(JSON.parse(rawUser))};
          }
          return null;
        } catch (error) {
          console.error('Error al obtener el usuario persistido:', error);
          return null;
        }
      };

      export const setPersistedToken = (user: any) =>  {
        try {
          localStorage.setItem(tokenKey, JSON.stringify(user));
          const token =  decodeToken(user);

          if (token) {
            return token 
          }

          return null

        } catch (error) {
          console.error('Error al almacenar el usuario persistido:', error);
          return null
        }
      };
      

      export const removePersistedToken = () => {
        try {
          localStorage.removeItem(tokenKey);
        } catch (error) {
          console.error('Error al eliminar el usuario persistido:', error);
        }
      };


      export const decodeToken = (token: string): User | null => {
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            return decodedToken as User;
          } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
          }
        }
        return null;
      };
}
