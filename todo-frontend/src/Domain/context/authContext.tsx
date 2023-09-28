import { AxiosError } from 'axios';
import React, { createContext, Dispatch, FC, useContext, useEffect, useMemo, useReducer } from 'react';
import { AuthActions, AuthState } from '../type';
import { TokenService } from '../services/User/UserPersistence';
import { UserService } from '../services/User/UserServices';




// Crear el contexto
const AuthContext = createContext<[AuthState, Dispatch<AuthActions>]>([
	{ isLoading: true, isSignOut: true, userToken: null },
	() => {}
])


const reducer = (state: AuthState, action: AuthActions): AuthState => {
	switch (action.type) {
		case 'SIGN_IN':
            debugger;
			return {
				...state,
				isLoading: false,
				isSignOut: false,
				userToken: action.payload.token
			}
		case 'SIGN_OUT':
			return {
				...state,
				isSignOut: true,
				userToken: null
			}

		default:
			return state
	}
}


export const AuthProvider: FC = ({ children }: any) => {
    const initialUserToken =  TokenService.getPersistedToken();

	const value = useReducer(reducer, {
		isLoading: true,
		isSignOut: false,
		userToken: initialUserToken
	})

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



export const useAuth = (): {
	state: AuthState
	actions: {
		signIn: (user: string, pass: string) => Promise<void>
		signOut: () => Promise<void>
	}
} => {
	const [state, dispatch] = useContext(AuthContext)

	const actions = useMemo(
		() => ({
			signIn: async (user: string, pass: string) => {
				try {       
					const request = await UserService.PostLoginUser(user, pass);
                    if (request.data.Success) {
                        await TokenService.setPersistedToken(`${request.data.data.token_type} ${request.data.data.access_token}`)
                        dispatch({ type: 'SIGN_IN', payload: { token: request?.data?.data?.access_token } })
                    }

				} catch (error) {
                   const errorParse = error as AxiosError
				}
			},
			signOut: async () => {
				await TokenService.removePersistedToken()
				dispatch({ type: 'SIGN_OUT' })
			}
		}),
		[dispatch]
	)
    useEffect(() => {
        console.log('Valor actualizado de state.userToken:', state.userToken);
      }, [state.userToken]);
	return { state, actions }
}
