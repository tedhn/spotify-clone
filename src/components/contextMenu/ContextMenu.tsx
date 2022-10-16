import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist } from "@/Slices/playlistSlice";
import { addToPlaylist, addToSavedTracks, removeFromSavedTracks } from "@/api";
import { useNavigate } from "react-router-dom";
import useContextMenu from "@/useContextMenu";
import { RootState } from "@/store";

interface PropTypes {
	anchorPoints: { x: number; y: number };
	selected: {
		uri: string;
		songId: string;
		artistId: string;
		albumId: string;
		isSaved: boolean;
	};
}

const menuOptions = [
	{ label: "Go to song radio", action: "goToRadio" },
	{ label: "Go to artist", action: "goToArtist" },
	{ label: "Go to album", action: "goToAlbum" },
	{ label: "Remove fromliked songs", action: "removeSongFromSaveTracks" },
	{ label: "Add to playlist", action: "addToPlaylist" },
];

const ContextMenu: FC<PropTypes> = ({
	anchorPoints: { x, y },
	selected,
	// setShowMenu,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isShowPlaylists, setShowPlaylists] = useState(false);

	const handleClick = (choice: string) => {
		switch (choice) {
			case "goToArtist": {
				navigate(`/dashboard/artist/${selected.artistId}`);
				break;
			}
			case "goToAlbum": {
				navigate(`/dashboard/album/${selected.albumId}`);
				break;
			}
			case "addToPlaylist": {
				addToPlaylist(selected.uri);
				break;
			}
			case "addToSaveTracks": {
				console.log("removing song to Saved Tracka :" + selected.songId);
				addToSavedTracks(selected.songId);
				break;
			}
			case "removeSongFromSaveTracks": {
				console.log("removing song to Saved Tracka :" + selected.songId);
				removeFromSavedTracks(selected.songId);
				break;
			}
			default: {
				break;
			}
		}
	};

	const handleNavigate = (type: string, id: string) => {
		navigate(`/dashboard/${type}/${id}`);
	};

	const handleSaveSongs = () => {
		if (selected.isSaved) {
			addToSavedTracks(selected.songId);
		} else {
			removeFromSavedTracks(selected.songId);
		}
	};
	const handlePlaylist = () => {};

	return (
		<div
			className='absolute text-sm z-10 w-48 shadow-md bg-black rounded-md px-2 py-4 flex flex-col justify-around gap-1'
			style={{
				bottom: y,
				right: x,
			}}>
			{/* {menuOptions.map((item) => (
				<div
					key={item.label}
					className='hover:bg-lightgrey/30 px-2 py-1 text-white'
					onClick={() => handleClick(item.action)}>
					{item.label}
				</div>
			))} */}
			<div
				className='hover:bg-lightgrey/30 px-2 py-1 text-white'
				onClick={() => handleNavigate("", "")}>
				Go to song radio
			</div>
			<div
				className='hover:bg-lightgrey/30 px-2 py-1 text-white'
				onClick={() => handleNavigate("artist", selected.artistId)}>
				Go to song artist
			</div>
			<div
				className='hover:bg-lightgrey/30 px-2 py-1 text-white'
				onClick={() => handleNavigate("album", selected.albumId)}>
				Go to song album
			</div>

			<hr />
			<div
				className='hover:bg-lightgrey/30 px-2 py-1 text-white'
				onClick={() => handleSaveSongs()}>
				{selected.isSaved ? "Remove from" : "Add to"} like songs
			</div>
			<div
				className='hover:bg-lightgrey/30 px-2 py-1 text-white'
				onMouseEnter={() => setShowPlaylists(true)}
				onMouseLeave={() => setShowPlaylists(false)}>
				Add to playlist
				{isShowPlaylists && <PlaylistMenu />}
			</div>
		</div>
	);
};

const PlaylistMenu = () => {
	const playlists = useSelector(
		(rootState: RootState) => rootState.playlist.playlists
	);

	const handleClick = () => {
		console.log("clicked playlist");
	};

	return (
		<div
			className='absolute text-sm z-10 w-48 shadow-md bg-black rounded-md px-2 py-4 flex flex-col justify-around gap-1'
			style={{
				bottom: 0,
				right: 200,
			}}>
			{playlists.map((playlist) => (
				<div key={playlist.id} onClick={handleClick}>
					{playlist.name}
				</div>
			))}
		</div>
	);
};

export default ContextMenu;
