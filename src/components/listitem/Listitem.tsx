import { FC, useState, useRef, useEffect } from "react";
import ContextMenu from "../contextMenu/ContextMenu";

interface PropsTypes {
	uri: string;
	render: (
		isHover: boolean,
		listRef: any,
		optionRef: any,
		setIsHover: React.Dispatch<React.SetStateAction<boolean>>
	) => React.ReactNode;
}
const Listitem: FC<PropsTypes> = ({ uri, render }) => {
	const [isHover, setIsHover] = useState(false);

	const listRef = useRef<HTMLDivElement>(null);
	const optionRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={listRef}>{render(isHover, listRef, optionRef, setIsHover)}</div>
	);
};

export default Listitem;
