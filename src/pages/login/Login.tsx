import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import logo from "@/icons/logo.png";

const Login: React.FC = () => {
	const {
		VITE_AUTH_ENDPOINT,
		VITE_CLIENT_ID,
		VITE_REDIRECT_URI,
		VITE_RESPONSE_TYPE,
		VITE_SCOPE,
	} = process.env;

	const AUTH_LINK = `${VITE_AUTH_ENDPOINT}?client_id=${VITE_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI}&response_type=${VITE_RESPONSE_TYPE}&scope=${VITE_SCOPE}`;

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		const code = location.search.split("=")[1];

		if (code !== undefined) {
			axios
				.post("http://localhost:3001/login", {
					code,
				})
				.then(({ data }) => {
					console.log(data["refresh_token"]);
					dispatch({
						type: "loginSaga",
						payload: { refreshToken: data["refresh_token"] },
					});

					navigate("dashboard");
				});
		}
	}, [location]);

	return (
		<div className='absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
			<img src={logo} alt='Spotify-Logo' />
			<a
				href={AUTH_LINK}
				className='py-3 text-lg font-medium rounded-full cursor-pointer px-9 bg-green'>
				LOGIN
			</a>
		</div>
	);
};

export default Login;
