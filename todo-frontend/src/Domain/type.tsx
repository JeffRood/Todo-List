
export type AuthActions =
	| { type: 'SIGN_OUT' }
	| { type: 'SIGN_IN'; payload: { token: string | null; } }


export interface AuthState {
	isLoading: boolean
	isSignOut: boolean
	userToken: string | null
}



export type AppActions =
	| { type: 'LOAD_DATA'; payload: any[] }

export interface AppContextState {
	DataCollection: any[];
}
        







