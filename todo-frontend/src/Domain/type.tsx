
export type AuthActions =
	| { type: 'SIGN_OUT' }
	| { type: 'SIGN_IN'; payload: { token: string | null; } }


export interface AuthState {
	isLoading: boolean
	isSignOut: boolean
	userToken: any | null
}



export type AppActions =
	| { type: 'LOAD_DATA'; payload: {list: any[], total: number} }

export interface AppContextState {
	DataCollection: any[];
	TotalRow: number
}
        







