import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import { Nav } from "@/components";
import {
	Dashboard,
	Login,
	Playlist,
	Search,
	Album,
	Artist,
	Library,
	SavedSongs,
} from "@/pages";
import { RootState } from "@/store";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authorized = useSelector((state: RootState) => state.auth.authorized);
	const refreshToken = useSelector(
		(state: RootState) => state.auth.refreshToken
	);

	useEffect(() => {
		const SPOTIFY_REFRESH_TOKEN = localStorage.getItem("SPOTIFY_REFRESH_TOKEN");

		if (SPOTIFY_REFRESH_TOKEN && !authorized) {
			axios.post("http://localhost:3001/refreshSession").then(({ data }) => {
				dispatch({
					type: "loginSaga",
					payload: { refreshToken: data["refresh_token"] },
				});
				navigate("dashboard");
			});
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div className='grid grid-cols-12'>
			{authorized && <Nav />}
			<Routes>
				<Route path='' element={<Login />} />
				<Route path='dashboard'>
					<Route path='' element={<Dashboard />} />
					<Route path='search' element={<Search />} />
					<Route path='library'>
						<Route path='' element={<Library />} />
						<Route path='savedSongs' element={<SavedSongs />} />
					</Route>
					<Route path='playlist'>
						<Route path='' element={<Playlist />} />
						<Route path=':id' element={<Playlist />} />
					</Route>
					<Route path='artist'>
						<Route path='' element={<Artist />} />
						<Route path=':id' element={<Artist />} />
					</Route>
					<Route path='album'>
						<Route path='' element={<Album />} />
						<Route path=':id' element={<Album />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
