import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
	authorized: boolean;
	user: UserType | undefined;
	refreshToken: string;
}

const initialState: LoginState = {
	authorized: false,
	user: undefined,
	refreshToken: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state: LoginState, action: any) => {
			const { payload } = action;

			return {
				authorized: true,
				user: payload.user,
				refreshToken: payload.refreshToken,
			};
		},
		logout: (state: LoginState) => {
			state.authorized = false;
			state.user = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
