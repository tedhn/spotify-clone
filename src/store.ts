import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import mySaga from "./Sagas/Saga";

import authReducer from "./Slices/authSlice";
import playlistReducer from "./Slices/playlistSlice";
import savedTracksReducer from "./Slices/savedTracksSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		auth: authReducer,
		playlist: playlistReducer,
		tracks: savedTracksReducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		sagaMiddleware,
	],
});
sagaMiddleware.run(mySaga);
export type RootState = ReturnType<typeof store.getState>;
