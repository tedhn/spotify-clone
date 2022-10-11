import React, { useState, useEffect, useRef } from "react";

const useContextMenu = () => {
	const playlistRef = useRef<any>();
	const [menuRef, setMenuRef] = useState<any>();
	const [selectedURI, setSelectedURI] = useState<any>();
	const [selectedID, setSelectedID] = useState<any>();
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
			setAnchorPoitns({ x: window.innerWidth - e.pageX, y: e.pageY });

			setMenuRef(listRef);
			setShowMenu(!isShowMenu);
		}
	};

	const updateContextMenuLocation = (e: React.MouseEvent<HTMLDivElement>) => {
		setAnchorPoitns({ x: window.innerWidth - e.pageX, y: e.pageY });
	};

	useEffect(() => {

		console.log(playlistRef)

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
		selectedURI,
		selectedID,
		setSelectedURI,
		setSelectedID,
		toggleContextMenu,
	};
};

export default useContextMenu;
