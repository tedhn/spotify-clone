import React, { useState, useEffect, useRef } from "react";
import { SongType } from "./types";

const useContextMenu = () => {
	const playlistRef = useRef<any>();
	const [menuRef, setMenuRef] = useState<any>();
	const [selectedURI, setSelectedURI] = useState<any>();
	const [selectedSongId, setSelectedSongId] = useState<any>();
	const [selectedArtistId, setSelectedArtistId] = useState<any>();
	const [selectedAlbumId, setSelectedAlbumId] = useState<any>();

	const [selected, setSelected] = useState({
		songId: "",
		uri: "",
		artistId: "",
		albumId: "",
		isSaved: false,
	});

	const [isShowMenu, setShowMenu] = useState(false);
	const [anchorPoints, setAnchorPoitns] = useState({ x: 0, y: 0 });

	const toggleContextMenu = (
		e: React.MouseEvent<HTMLDivElement>,
		listRef: any,
		optionRef: any
	) => {
		if (isShowMenu) {
			if (!menuRef.current.contains(e.target)) {
				updateContextMenuLocation(e);
			} else {
				setShowMenu(false);
			}
		} else {
			setAnchorPoitns({
				x: window.innerWidth - e.pageX,
				y: window.innerHeight - e.pageY,
			});

			setMenuRef(listRef);
			setShowMenu(!isShowMenu);
		}
	};

	const updateContextMenuLocation = (e: React.MouseEvent<HTMLDivElement>) => {
		setAnchorPoitns({ x: window.innerWidth - e.pageX, y: e.pageY });
	};

	const handleOptionClick = (
		songId: string,
		artistId: string,
		albumId: string,
		uri: string,
		isSaved: boolean,
		e: React.MouseEvent<HTMLDivElement>,
		menuRef: HTMLDivElement,
		optionRef: HTMLDivElement
	) => {
		setSelectedSongId(songId);
		setSelectedArtistId(artistId);
		setSelectedAlbumId(albumId);
		setSelectedURI(uri);
		setSelected({
			songId: songId,
			uri: uri,
			artistId: artistId,
			albumId: albumId,
			isSaved: isSaved,
		});
		toggleContextMenu(e, menuRef, optionRef);
	};

	useEffect(() => {
		console.log(playlistRef);

		const handleOutsideClick = (e: any) => {
			if (!playlistRef.current?.contains(e.target)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handleOutsideClick);

		return () => window.removeEventListener("click", handleOutsideClick);
	}, [menuRef]);

	return {
		playlistRef,
		isShowMenu,
		anchorPoints,
		selected,
		handleOptionClick,
	};
};

export default useContextMenu;
