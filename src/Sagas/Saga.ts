import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* loginSaga(action: any) {
	const { refreshToken } = action.payload;
	const { data } = yield call(axios.get, "http://localhost:3001/me");

	localStorage.setItem("SPOTIFY_REFRESH_TOKEN", refreshToken);

	yield put({
		type: "auth/login",
		payload: {
			user: data,
			refreshToken,
		},
	});
}

function* logoutSaga() {
	localStorage.clear();
	yield put({ type: "auth/logout" });
}

function* mySaga() {
	yield takeLatest("loginSaga", loginSaga);
	yield takeLatest("logoutSaga", logoutSaga);
}
export default mySaga;
