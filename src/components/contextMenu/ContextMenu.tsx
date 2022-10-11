import axios from "axios";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "@/Slices/playlistSlice";
import { addToPlaylist, removeFromSavedTracks } from "@/api";

interface PropTypes {
	anchorPoints: { x: number; y: number };
	uri: string;
	songID: string;
}

const menuOptions = [
	{ label: "Go to song radio", action: "goToRadio" },
	{ label: "Go to artist", action: "goToArtist" },
	{ label: "Go to album", action: "goToablum" },
	{ label: "Remove from liked songs", action: "removeSongFromSaveTracks" },
	{ label: "Add to playlist", action: "addToPlaylist" },
];

const ContextMenu: FC<PropTypes> = ({
	anchorPoints: { x, y },
	uri,
	songID,
	// setShowMenu,
}) => {
	const dispatch = useDispatch();

	const handleClick = (choice: string) => {
		switch (choice) {
			case "addToPlaylist": {
				addToPlaylist(uri);
				break;
			}
			case "removeSongFromSaveTracks": {
				console.log("removing song to Saved Tracka :" + songID);
				removeFromSavedTracks(songID);
				break;
			}
			default: {
				break;
			}
		}
	};

	return (
		<div
			className='absolute text-sm z-10 w-64 shadow-md bg-black rounded-md px-4 py-2'
			style={{
				top: y,
				right: x,
			}}>
			{menuOptions.map((item) => (
				<div
					key={item.label}
					className='hover:bg-lightgrey/30 px-2 py-1 text-white'
					onClick={() => handleClick(item.action)}>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default ContextMenu;
