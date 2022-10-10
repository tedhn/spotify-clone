import axios from "axios";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "@/Slices/playlistSlice";

interface PropTypes {
	anchorPoints: { x: number; y: number };
	uri: string;
	songID: string;
	// setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	menu: Array<{ label: string; action: string }>;
	handlers: any;
}

const ContextMenu: FC<PropTypes> = ({
	anchorPoints: { x, y },
	uri,
	songID,
	menu,
	handlers,
	// setShowMenu,
}) => {
	const dispatch = useDispatch();

	const handleAddToPlaylist = async () => {
		axios.post("http://localhost:3001/addToPlaylist", {
			playlistId: "3cSpNwEM2C4GMrggDLSDhD",
			song: uri,
		});

		const { data } = await axios.get("http://localhost:3001/playlist");

		dispatch(updatePlaylist(data.items));
	};

	const handleClick = (choice: string) => {
		switch (choice) {
			case "addToPlaylist": {
				handleAddToPlaylist();
				break;
			}
			case "removeSong": {
				console.log("removing song :" + songID);
				handlers.remove(songID);
				// handleRemoveSong(songID);
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
			{menu.map((item) => (
				<div
					className='hover:bg-lightgrey/30 px-2 py-1 text-white'
					onClick={() => handleClick(item.action)}>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default ContextMenu;
