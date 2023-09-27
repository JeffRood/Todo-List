import { AxiosError } from 'axios';
import React, { createContext, Dispatch, FC, useContext, useMemo, useReducer } from 'react';
import { AuthActions, AuthState } from '../type';
import { UserPersistService } from '../services/User/UserPersistence';
import { UserService } from '../services/User/UserServices';




// Crear el contexto
const AuthContext = createContext<[AuthState, Dispatch<AuthActions>]>([
	{ isLoading: true, isSignOut: false, userToken: null },
	() => {}
])


const reducer = (state: AuthState, action: AuthActions): AuthState => {
	switch (action.type) {
		case 'SIGN_IN':
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
	const value = useReducer(reducer, {
		isLoading: true,
		isSignOut: false,
		userToken: null
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
                    debugger;
					const request = await UserService.PostLoginUser(user, pass);
                    UserPersistService.setPersistedUser(request.data)
					dispatch({ type: 'SIGN_IN', payload: { token: request?.data?.token } })

				} catch (error) {
                   const errorParse = error as AxiosError
                   
				}
			},
			signOut: async () => {
				await UserPersistService.removePersistedUser()
				dispatch({ type: 'SIGN_OUT' })
			}
		}),
		[dispatch]
	)
	return { state, actions }
}
