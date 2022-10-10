import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";



import { updatePlaylist } from "@/Slices/playlistSlice";
import { RootState } from "@/store";

const Nav = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const playlists = useSelector((state: RootState) => state.playlist.playlists);
	const user = useSelector((state: RootState) => state.auth.user);

	const handleClick = (url: string) => {
		navigate("dashboard/" + url);
	};
	const getPlaylistData = async () => {
		const { data } = await axios.get("http://localhost:3001/playlist");

		dispatch(updatePlaylist(data.items));
	};

	useEffect(() => {
		getPlaylistData();
	}, [user]);


	return (
		<div className='sticky top-0 flex flex-col w-full h-screen col-span-2 gap-4 bg-black'>
			<ul className='flex flex-col mt-12'>
				<li
					className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 cursor-pointer hover:text-white'
					onClick={() => handleClick("")}>
					<div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
							/>
						</svg>
					</div>
					<div className='mx-2 text-xs font-medium'>Home</div>
				</li>
				<li
					className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 cursor-pointer hover:text-white'
					onClick={() => handleClick("search")}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
					<div className='mx-2 text-xs font-medium'>Search</div>
				</li>
				<li
					className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 cursor-pointer hover:text-white'
					onClick={() => handleClick("library")}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
						/>
					</svg>

					<div className='mx-2 text-xs font-medium'>Your Library</div>
				</li>
				<li className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 cursor-pointer hover:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
						/>
					</svg>
					<div
						className='mx-2 text-xs font-medium'
						onClick={() => handleClick("library/savedSongs")}>
						Liked Songs
					</div>
				</li>
				<li className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 cursor-pointer hover:text-white '>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<div
						className='mx-2 text-xs font-medium'
						onClick={() => handleClick("create")}>
						Create Playlist
					</div>
				</li>
			</ul>

			<ul className='flex flex-col grow'>
				{playlists.map((playlist) => (
					<li
						className='flex items-center justify-start w-3/4 px-2 py-1 mx-auto my-1 text-xs cursor-pointer hover:text-white'
						key={playlist.id}
						onClick={() => handleClick("playlist/" + playlist.id)}>
						{playlist.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Nav;
