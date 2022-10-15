import { useEffect } from "react";

import { Card } from "@/components";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setSavedTracks } from "@/Slices/savedTracksSlice";
import { getSavedTracks } from "@/api";
import { PlaylistType } from "@/types";

const Library = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const playlists = useSelector(
		(rootState: RootState) => rootState.playlist.playlists
	);

	const { tracks, total } = useSelector(
		(rootState: RootState) => rootState.tracks
	);

	useEffect(() => {
		onLoad();
	}, []);

	const onLoad = async () => {
		const data = await getSavedTracks(tracks.length);
		dispatch(setSavedTracks({ total: data.total, tracks: data.items }));
	};

	return (
		<div className='col-span-10 grid px-8 py-12 gap-x-16 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto'>
			<div
				className='col-span-2 gap-2 px-4 my-2 rounded-md cursor-pointer bg-black/30 hover:bg-grey/30 relative'
				onClick={() => navigate("SavedSongs")}>
				<div
					className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3
				'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-16 h-16'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
						/>
					</svg>
				</div>
				<div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-center'>
					<div>Saved Songs</div>
					<div>{total} liked songs</div>
				</div>
			</div>
			{playlists.map((playlist: PlaylistType) => {
				return (
					<Card result={playlist} subtitle={playlist.owner.display_name} />
				);
			})}
		</div>
	);
};

export default Library;
