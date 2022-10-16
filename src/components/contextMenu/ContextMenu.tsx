import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist } from "@/Slices/playlistSlice";
import { addToPlaylist, addToSavedTracks, removeFromSavedTracks } from "@/api";
import { useNavigate } from "react-router-dom";
import useContextMenu from "@/useContextMenu";
import { RootState } from "@/store";
import { setContext } from "redux-saga/effects";
import MenuItem from "./MenuItem";

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

const ContextMenu: FC<PropTypes> = ({
	anchorPoints: { x, y },
	selected,
	// setShowMenu,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { setContextMenuRef } = useContextMenu();

	const playlists = useSelector(
		(rootState: RootState) => rootState.playlist.playlists
	);

	const contextMenuRef = useRef<any>();

	const handleNavigate = (type: string, id: string) => {
		navigate(`/dashboard/${type}/${id}`);
	};

	const handleSaveSongs = () => {
		if (selected.isSaved) {
			console.log("removing");
			removeFromSavedTracks(selected.songId);
		} else {
			console.log("adding");
			addToSavedTracks(selected.songId);
		}
	};
	const handlePlaylist = (id: string) => {
		console.log(id);
	};

	useEffect(() => {
		console.log(contextMenuRef);
		setContextMenuRef(contextMenuRef);
	}, []);

	return (
		<div
			className='absolute text-sm z-10 w-48 shadow-md bg-black rounded-md py-4 flex flex-col justify-around gap-1'
			style={{
				bottom: y,
				right: x,
			}}
			ref={contextMenuRef}>
			<MenuItem
				label='Go to song radio'
				handler={() => handleNavigate("", "")}
			/>
			<MenuItem
				label='Go to song album'
				handler={() => handleNavigate("album", selected.albumId)}
			/>
			<MenuItem
				label='Go to song Artist'
				handler={() => handleNavigate("album", selected.artistId)}
			/>

			<hr />

			<MenuItem
				label={`${selected.isSaved ? "Remove from" : "Add to"} saved songs`}
				handler={handleSaveSongs}
			/>
			<MenuItem
				label='Add to playlist'
				items={playlists}
				depth={1}
				handler={handlePlaylist}
			/>
		</div>
	);
};

//TODO : NEED TO FIX AUTO CLOSER FOR CONTEXT MENU

export default ContextMenu;
