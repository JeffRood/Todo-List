
export type AuthActions =
	| { type: 'SIGN_OUT' }
	| { type: 'SIGN_IN'; payload: { token: string | null, user: User | null } }


export interface AuthState {
	isLoading: boolean
	isSignOut: boolean
	userToken: any | null,
	user: User | null
}



export interface User {
	sub: string
	name: string
	id: string
}



export type AppActions =
	| { type: 'LOAD_DATA'; payload: {list: any[], total: number} }

export interface AppContextState {
	DataCollection: any[];
	TotalRow: number
}
        







